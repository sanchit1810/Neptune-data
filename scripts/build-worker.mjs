import { cp, mkdir, rm } from "node:fs/promises";
await rm("dist/server", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await cp("server", "dist/server", { recursive: true });
