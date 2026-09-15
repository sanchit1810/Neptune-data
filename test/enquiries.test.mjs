import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync, readdirSync } from "node:fs";
import worker from "../server/index.js";

function database() {
  const sql = new DatabaseSync(":memory:");
  for (const migration of readdirSync("drizzle")
    .filter((x) => x.endsWith(".sql"))
    .sort())
    sql.exec(readFileSync(`drizzle/${migration}`, "utf8"));
  return {
    sql,
    prepare(statement) {
      return {
        bind(...args) {
          return { statement, args };
        },
      };
    },
    async batch(statements) {
      sql.exec("BEGIN");
      try {
        const results = statements.map(({ statement, args }) => ({
          success: true,
          results: sql.prepare(statement).all(...args),
        }));
        sql.exec("COMMIT");
        return results;
      } catch (error) {
        sql.exec("ROLLBACK");
        throw error;
      }
    },
  };
}
const valid = () => ({
  id: crypto.randomUUID(),
  name: "Website test",
  email: "test@example.com",
  organisation: "Test organisation",
  topic: "customer-service",
  message: "A test enquiry for real-world conversational speech.",
  source: "/customer-service/",
  website: "",
});
const req = (data, headers = {}) =>
  new Request(
    "https://neptune-data.sanchit-dekate37.chatgpt.site/api/enquiries",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(data),
    },
  );

test("successful enquiry is persisted and duplicate retry stores only one record", async () => {
  const db = database();
  const data = valid();
  for (let i = 0; i < 2; i++) {
    const response = await worker.fetch(req(data), { DB: db });
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      status: "received",
      id: data.id,
    });
  }
  assert.equal(
    db.sql.prepare("SELECT count(*) AS total FROM enquiries").get().total,
    1,
  );
  assert.equal(
    db.sql.prepare("SELECT message FROM enquiries").get().message,
    data.message,
  );
  db.sql.close();
});
test("reused id cannot silently replace the original enquiry", async () => {
  const db = database(),
    data = valid();
  await worker.fetch(req(data), { DB: db });
  const response = await worker.fetch(
    req({
      ...data,
      message: "Changed enquiry that must not overwrite the first.",
    }),
    { DB: db },
  );
  assert.equal(response.status, 409);
  assert.equal(
    db.sql.prepare("SELECT message FROM enquiries").get().message,
    data.message,
  );
  db.sql.close();
});
test("invalid input and honeypot submissions are rejected without storage", async () => {
  const db = database();
  for (const patch of [
    { email: "bad" },
    { topic: "invented" },
    { name: " " },
    { message: "short" },
    { website: "spam.test" },
    { source: "/unknown" },
    { id: "wrong" },
    { organisation: "x".repeat(161) },
  ]) {
    assert.equal(
      (await worker.fetch(req({ ...valid(), ...patch }), { DB: db })).status,
      422,
    );
  }
  assert.equal(
    db.sql.prepare("SELECT count(*) AS total FROM enquiries").get().total,
    0,
  );
  db.sql.close();
});
test("database failure never returns a successful receipt", async () => {
  const response = await worker.fetch(req(valid()), {
    DB: {
      batch() {
        throw Error("unavailable");
      },
      prepare() {
        throw Error("unavailable");
      },
    },
  });
  assert.equal(response.status, 503);
  assert.ok((await response.json()).error);
});
test("endpoint rejects cross-origin requests, oversized input and wrong methods", async () => {
  assert.equal(
    (
      await worker.fetch(
        req(valid(), { Origin: "https://unrelated.example" }),
        {},
      )
    ).status,
    403,
  );
  assert.equal(
    (await worker.fetch(req({ ...valid(), message: "x".repeat(25000) }), {}))
      .status,
    413,
  );
  assert.equal(
    (await worker.fetch(new Request("https://example.test/api/enquiries"), {}))
      .status,
    405,
  );
  assert.equal(
    (
      await worker.fetch(
        new Request("https://example.test/api/enquiries", {
          method: "POST",
          body: "bad",
        }),
        {},
      )
    ).status,
    415,
  );
});
test("private enquiries have no read route and ordinary pages use the static asset binding", async () => {
  assert.equal(
    (
      await worker.fetch(
        new Request("https://example.test/api/enquiries/list"),
        {},
      )
    ).status,
    404,
  );
  const result = await worker.fetch(
    new Request("https://example.test/healthcare/"),
    { ASSETS: { fetch: async () => new Response("Healthcare page") } },
  );
  assert.equal(await result.text(), "Healthcare page");
});
