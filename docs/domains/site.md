# Site

## Purpose

The pages a visitor sees: one home page per language with the profile laid out like the CV,
a 404 page, and the redirect from the bare domain. Everything here is prerendered except that
redirect.

## Key files

- `src/pages/[lang]/index.astro` (`getStaticPaths`): the home page, one build per locale.
- `src/pages/index.ts` (`GET`): redirects `/` to `/en/`, the default language. Runs in the Worker.
- `src/pages/404.astro`: one static page for every unknown URL, in both languages.
- `src/layouts/BaseLayout.astro`: head (canonical, hreflang, Open Graph, JSON-LD), top bar,
  footer and the assistant.
- `src/components/Nav.astro`: section links and the language switch.
- `src/components/Hero.astro` and `src/scripts/ribbon.ts`: opening block and its canvas ribbon.
- `src/components/Section.astro`: the label and content grid every section shares.
- `src/components/Mark.astro`: the asterisk mark.
- `src/styles/global.css`: tokens and the shared `label`, `entry`, `tags` and `button` classes.
- `public/_headers`: security headers and cache rules.
- `astro.config.mjs`, `wrangler.jsonc`: build and Worker config.

## Data

None of its own. Copy comes from `src/i18n`, facts from `src/data/profile.ts`
(`docs/domains/content.md`).

## Flow

1. A request for `/` reaches the Worker and is redirected to `/en/` (`docs/decisions.md`, D6).
2. `/en/` and `/es/` are static files served by Cloudflare without running the Worker.
3. In the browser two scripts load: `ribbon.ts` (hero canvas) and `chat.ts` (assistant).

## Invariants

- Section ids come from `SECTIONS` and are the same in every locale: the nav links, the
  assistant's tool and `Section.astro` all rely on it.
- No inline scripts or styles anywhere, or the Content Security Policy blocks them
  (`docs/decisions.md`, D4).
- Every page sets `lang`, a canonical URL and hreflang alternates for all locales.
- Motion respects `prefers-reduced-motion`: the ribbon draws one still frame and CSS
  animations are cut in `global.css`.

## Gotchas

- `_headers` applies to static assets only. Responses built by the Worker (`/`, `/api/chat`)
  set their own headers in code.
- `dist/_worker.js` holds the server bundle. `public/.assetsignore` keeps it from being served
  as an asset; do not remove it.
- Astro inlines small scripts and stylesheets by default. `assetsInlineLimit: 0` and
  `inlineStylesheets: 'never'` in `astro.config.mjs` turn that off; removing them breaks the
  site under the Content Security Policy with no build error.
- Elements created by a script do not get Astro's scoped style attribute. Styles for them are
  global (`Chat.astro` uses `is:global`).
- Images imported from `src/assets` are also emitted at their original size. Keep sources
  small: the build publishes them.

## Related

- `DESIGN.md`: the visual rules these files implement.
- `docs/decisions.md`: D2, D3, D4, D5, D6.
- `docs/operations.md`: deploy and local commands.
