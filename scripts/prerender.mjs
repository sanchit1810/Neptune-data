import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";
const shell = await readFile("dist/client/index.html", "utf8");
const routes = ["/", "/customer-service/", "/healthcare/"];
for (const path of [...routes, "/404/"]) {
  const { html, title, description } = render(path);
  const safe = (s) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;");
  const output = shell
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${path === "/404/" ? "Page not found | Neptune Data" : safe(title)}</title>`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${safe(description)}" />`,
    );
  const dir =
    path === "/" || path === "/404/" ? "dist/client" : `dist/client${path}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/${path === "/404/" ? "404" : "index"}.html`, output);
  console.log(`Rendered ${path}`);
}
