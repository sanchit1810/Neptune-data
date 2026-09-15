import { cp, rm, writeFile } from "node:fs/promises";
import { build } from "vite";

await rm("dist/pages", { recursive: true, force: true });
await cp("dist/client", "dist/pages", { recursive: true });
await build({
  configFile: false,
  publicDir: false,
  build: {
    ssr: "server/index.js",
    outDir: "dist/pages",
    emptyOutDir: false,
    minify: true,
    rollupOptions: { output: { entryFileNames: "_worker.js" } },
  },
});
await writeFile("dist/pages/_routes.json", JSON.stringify({
  version: 1, include: ["/api/*"], exclude: [],
}, null, 2) + "\n");
console.log("Cloudflare Pages output: dist/pages");
