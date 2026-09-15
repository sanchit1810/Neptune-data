import { saveEnquiry } from "./database.js";
const topics = new Set([
  "customer-service",
  "healthcare",
  "data-partnership",
  "other",
]);
const paths = new Set([
  "/",
  "/customer-service/",
  "/customer-service",
  "/healthcare/",
  "/healthcare",
]);
const json = (body, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
const fail = (error, status) => json({ error }, status);

async function readBoundedJson(request) {
  if (!request.body) throw new Error("EMPTY");
  const reader = request.body.getReader();
  const chunks = [];
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 24576) {
      await reader.cancel();
      throw new Error("LARGE");
    }
    chunks.push(value);
  }
  const body = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/enquiries") {
      if (url.pathname.startsWith("/api/")) return fail("Not found.", 404);
      return env.ASSETS.fetch(request);
    }
    if (request.method !== "POST")
      return new Response(null, { status: 405, headers: { Allow: "POST" } });
    const origin = request.headers.get("origin");
    const allowedOrigins = new Set([
      url.origin,
      "https://neptune-data.sanchit-dekate37.chatgpt.site",
    ]);
    if (origin && !allowedOrigins.has(origin))
      return fail(
        "Please submit this form from the Neptune Data website.",
        403,
      );
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      return fail("Expected a JSON enquiry.", 415);
    if (Number(request.headers.get("content-length") || 0) > 24576)
      return fail("Your enquiry is too long.", 413);
    let input;
    try {
      input = await readBoundedJson(request);
    } catch (error) {
      return fail(
        error.message === "LARGE"
          ? "Your enquiry is too long."
          : "Please check the form and try again.",
        error.message === "LARGE" ? 413 : 400,
      );
    }
    if (!input || Array.isArray(input) || typeof input !== "object")
      return fail("Please check the form and try again.", 400);
    if (input.website) return fail("Please check the form and try again.", 422);
    const fields = {};
    for (const [field, min, max] of [
      ["name", 2, 120],
      ["email", 3, 254],
      ["organisation", 2, 160],
      ["message", 10, 5000],
      ["topic", 1, 40],
      ["source", 1, 80],
      ["id", 36, 36],
    ]) {
      const value = typeof input[field] === "string" ? input[field].trim() : "";
      if (value.length < min || value.length > max || value.includes("\u0000"))
        return fail(
          `Please check the ${field === "id" || field === "source" ? "form" : field} field.`,
          422,
        );
      fields[field] = value;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      return fail("Please enter a valid email address.", 422);
    if (
      !topics.has(fields.topic) ||
      !paths.has(fields.source) ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        fields.id,
      )
    )
      return fail("Please check the form and try again.", 422);
    fields.email = fields.email.toLowerCase();
    try {
      const { id, ...payload } = fields;
      const hash = Array.from(
        new Uint8Array(
          await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(JSON.stringify(payload)),
          ),
        ),
      )
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
      if (!(await saveEnquiry(env.DB, fields, hash)))
        return fail(
          "This enquiry was already received with different details. Refresh the page to send a new enquiry.",
          409,
        );
      return json({ status: "received", id }, 201);
    } catch {
      return fail("We couldn’t save your enquiry. Please try again.", 503);
    }
  },
};
