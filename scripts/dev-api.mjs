import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { Readable } from "node:stream";
import worker from "../server/index.js";
export function devApi() {
  return {
    name: "neptune-local-enquiry-api",
    configureServer(server) {
      mkdirSync(".local", { recursive: true });
      const sqlite = new DatabaseSync(".local/enquiries.sqlite");
      sqlite.exec(
        "CREATE TABLE IF NOT EXISTS _dev_migrations (name TEXT PRIMARY KEY)",
      );
      for (const name of readdirSync("drizzle")
        .filter((x) => x.endsWith(".sql"))
        .sort()) {
        if (
          !sqlite
            .prepare("SELECT name FROM _dev_migrations WHERE name = ?")
            .get(name)
        ) {
          sqlite.exec(readFileSync(`drizzle/${name}`, "utf8"));
          sqlite
            .prepare("INSERT INTO _dev_migrations (name) VALUES (?)")
            .run(name);
        }
      }
      const db = {
        prepare(sql) {
          return {
            bind(...args) {
              return { sql, args };
            },
          };
        },
        async batch(statements) {
          sqlite.exec("BEGIN");
          try {
            const results = statements.map(({ sql, args }) => {
              const statement = sqlite.prepare(sql);
              if (/^SELECT/i.test(sql))
                return { success: true, results: statement.all(...args) };
              statement.run(...args);
              return { success: true, results: [] };
            });
            sqlite.exec("COMMIT");
            return results;
          } catch (error) {
            sqlite.exec("ROLLBACK");
            throw error;
          }
        },
      };
      server.httpServer?.on("close", () => sqlite.close());
      server.middlewares.use("/api", async (req, res) => {
        try {
          const url = new URL(req.originalUrl, `http://${req.headers.host}`);
          const request = new Request(url, {
            method: req.method,
            headers: req.headers,
            ...(req.method === "POST"
              ? { body: Readable.toWeb(req), duplex: "half" }
              : {}),
          });
          const response = await worker.fetch(request, { DB: db });
          res.writeHead(response.status, Object.fromEntries(response.headers));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Local form service unavailable." }));
        }
      });
    },
  };
}
