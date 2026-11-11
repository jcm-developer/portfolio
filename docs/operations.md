# Operations

Environment variables, deploy, CI and running costs. Owner of every fact about how the
portfolio runs outside the code itself.

## Environment variables

| Name | Where | Required | Purpose |
|---|---|---|---|
| `OPENAI_API_KEY` | Worker secret (runtime) | For the assistant | Key used by `src/pages/api/chat.ts`. Without it the site works and the assistant answers "unavailable". |
| `OPENAI_MODEL` | Worker variable (runtime) | No | Model id. Defaults to `DEFAULT_MODEL` in `src/pages/api/chat.ts`. |
| `OPENAI_CHAT_URL` | Worker variable (runtime) | No | Any OpenAI-compatible chat completions URL, to route through a gateway or a local mock. |
| `SITE_URL` | Build variable | Recommended | Canonical origin for the sitemap, canonical and hreflang tags (`astro.config.mjs`). |

Never commit a secret. Variables that end up in a public bundle are public.

**Never create a `PUBLIC_` variable that holds a secret, in any environment.** Astro copies
every `PUBLIC_` variable it finds at build time into the output, including the server bundle.
The previous version of this site leaked its key exactly that way (`docs/decisions.md`, D2).

Locally, runtime values live in `.dev.vars` (ignored by git; template in `.dev.vars.example`).

## Local development

Requires Node 22.23.4 or later, the minimum for Astro 7. `.node-version` pins the version used
by CI and by Cloudflare Workers Builds.

```bash
npm install
cp .dev.vars.example .dev.vars   # then set OPENAI_API_KEY; optional for everything but the assistant
npm run dev                      # http://localhost:4321, with hot reload
```

| Command | What it does |
|---|---|
| `npm run dev` | Astro dev server. The Cloudflare bindings (rate limiter, `.dev.vars`) are emulated. |
| `npm run build` | Production build: static files in `dist/client/`, the Worker in `dist/server/` with the deployable `wrangler.json`. |
| `npm run preview` | Serves the last build with `wrangler dev` on http://localhost:8787: the real Worker, with the headers from `public/_headers`. Run `npm run build` first. |
| `npm run check` | Type check of `.astro` and `.ts` files. |
| `npm test` | Unit tests (Vitest). |

`npm run dev` does not apply `public/_headers`, so a Content Security Policy violation only
shows up under `npm run preview`. Check there after touching scripts, styles or fonts.

## Deploy

The site runs as one Cloudflare Worker with static assets, built by Cloudflare from this
repository (Workers Builds). The repo carries the config (`wrangler.jsonc`); the project itself
is created once from the dashboard:

1. Workers & Pages, Create, Import a repository, pick this repo.
2. Project name: `portfolio`. It must match `name` in `wrangler.jsonc`.
3. Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
4. Build variables: `SITE_URL` with the final origin (the `workers.dev` URL or the custom domain).
5. After the first deploy: Settings, Variables and Secrets, add `OPENAI_API_KEY` as type
   **Secret**. Secrets apply to the Worker at runtime, not to the build.

Every push to `main` deploys to production; other branches get a preview URL through
`npx wrangler preview`.

The rate limiter (`CHAT_LIMITER` in `wrangler.jsonc`) needs no setup: the binding creates it.
Previews use their own namespace from the `previews` block, so they never share a counter with
production; without that block `wrangler preview` refuses to deploy. Previews keep their own
secrets (`npx wrangler preview secret`, or the Preview base config in the dashboard): if
`OPENAI_API_KEY` is not set there, the assistant on a preview answers with its "unavailable"
error.

Outside Cloudflare, also set a monthly budget on the OpenAI project that owns the key. It is
the last line of defence if every other limit is bypassed.

## CI

- `.github/workflows/ci.yml`: the gate (`npm run check`, `npm test`, `npm run build`) on every
  push to `main` and every pull request.
- `.github/workflows/standards.yml`: `scripts/check-docs.mjs` and the commit message format.

## Costs

- **Cloudflare Workers:** the free plan covers this site. Static pages are served as assets and
  do not count as Worker requests; only `/` and `/api/chat` do.
- **OpenAI:** paid per token. One answer is capped at `MAX_OUTPUT_TOKENS` output tokens and the
  prompt is about 1,000 input tokens, and one visitor is limited to 8 questions per minute.
  The budget on the OpenAI project caps the total.
