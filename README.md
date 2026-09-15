# Neptune Data website

September 2026 redesign, based on the original React/Vite website.

## Pages

- `/`: company overview, two focus areas, approach, data partners, direct contact.
- `/customer-service/`: speech, conversation context, and outcomes.
- `/healthcare/`: specialist clinical data, with radiotherapy evaluation explicitly described as an area under exploration.
- Unknown URLs render a not-found page.

## Development

Use Node 22 or newer. Run `npm ci`, then `npm run dev`.
`npm run build` generates static HTML for each route and the hydration bundle in `dist`.
`npm run preview` serves that output locally. Deploy `dist` as static assets.

The original GitHub / Cloudflare production site is separate from the private Sites review deployment configured in `.openai/hosting.json`.

## Design and content

DM Serif Display and Inter are self-hosted as WOFF2 subsets. Their licence notices are in `public/fonts`. The existing Neptune Data planet mark is retained. The blue glass image is original generated artwork. The conversation and clinical-record diagrams are labelled illustrations, not dataset samples or patient data.

The site has no inquiry backend. Contact links open the visitor's email application with a topic-specific subject. No form simulates delivery. There are no analytics scripts or cookies set by the application. Hosting may have its own access/session handling.

Public focus areas are not a ready-to-license catalogue. Avoid adding unverified inventory counts, partner logos, compliance guarantees, availability claims, or clinical performance claims. Source decisions are recorded in the parent project's Research notes and Website redesign brief.
