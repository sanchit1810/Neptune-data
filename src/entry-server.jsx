import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { getPageMeta } from "./content.jsx";
export function render(path) {
  return { html: renderToString(<App path={path} />), ...getPageMeta(path) };
}
