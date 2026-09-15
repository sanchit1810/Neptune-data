import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sites } from "@openai/sites-vite-plugin";
export default defineConfig(async ({ command }) => ({
  plugins: [
    react(),
    sites(),
    ...(command === "serve"
      ? [(await import("./scripts/dev-api.mjs")).devApi()]
      : []),
  ],
  build: { outDir: "dist/client" },
}));
