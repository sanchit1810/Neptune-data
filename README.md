# Neptune Data website

September 2026 redesign, based on the original React/Vite website.

## Pages

- `/`: company overview, two focus areas, approach, data partners, direct contact.
- `/customer-service/`: speech, conversation context, and outcomes.
- `/healthcare/`: specialist clinical data, with radiotherapy evaluation explicitly described as an area under exploration.
- Unknown URLs render a not-found page.

## Development

Use Node 22 or newer. Run `npm ci`, then `npm run dev`.
`npm run build` generates pre-rendered HTML and the hydration bundle in `dist/client`, and a Cloudflare Worker in `dist/server`.
`npm run dev` runs Vite plus the enquiry API backed by a local SQLite database in the ignored `.local` directory. `npm test` checks the API against SQLite.
Production uses Sites-managed D1 through the `DB` binding. Run `npm run db:generate` for schema changes and retain generated Drizzle migrations. Sites applies these before publication.

The original GitHub / Cloudflare production site is separate from the private Sites review deployment configured in `.openai/hosting.json`.

## Design and content

Manrope and Inter are self-hosted as WOFF2 subsets. Their licence notices are in `public/fonts`. The existing Neptune Data planet mark is retained. The blue glass image is original generated artwork. The conversation and clinical-record diagrams are labelled illustrations, not dataset samples or patient data.

The contact form posts to `/api/enquiries`. Successful submissions are stored in the private D1 `enquiries` table and can be inspected through the site's database tools/settings. No public read/list endpoint exists. The API validates fields, limits request size, rejects cross-origin browser submissions, and uses a random request ID to make retries idempotent. It returns a receipt only after storage succeeds. It does not send email notifications. Footer email links remain available as an alternative.

The application has no analytics or cookie tracking. Hosting may have its own access/session handling.

Public focus areas are not a ready-to-license catalogue. Avoid adding unverified inventory counts, partner logos, compliance guarantees, availability claims, or clinical performance claims. Source decisions are recorded in the parent project's Research notes and Website redesign brief.


## Typography definition

- Display headings and prominent titles: Manrope, medium (500), compact tracking, responsive sizing.
- Body copy and forms: Inter, regular (400), 16px baseline.
- Navigation, form labels and actions: Inter, medium (500).
- Small secondary labels: Inter with restrained tracking.

The Manrope direction is a proposed implementation pending the founder's font preference. It replaces the first draft's DM Serif Display headings.
