# Site

## Purpose

The pages a visitor sees: one home page per language with the profile laid out like the CV,
a 404 page, and the redirect from the bare domain. Everything here is prerendered except that
redirect.

## Key files

- `src/pages/[lang]/index.astro` (`getStaticPaths`): the home page, one build per locale.
- `src/pages/index.ts` (`GET`): redirects `/` to `/en/`, the default language. Runs in the Worker.
- `src/pages/404.astro`: one static page for every unknown URL, in both languages.
- `src/pages/llms.txt.ts` and `src/lib/llms.ts` (`buildLlmsTxt`): `/llms.txt`, a Markdown
  summary of the profile for AI assistants, prerendered from the English dictionary.
- `src/layouts/BaseLayout.astro`: head (canonical, hreflang, Open Graph, the JSON-LD `Person`
  with employer, schools, skills and languages), top bar,
  footer and the assistant.
- `src/components/Nav.astro`: section links and the language switch.
- `src/components/Hero.astro` and `src/scripts/ribbon.ts`: opening block and its canvas ribbon.
- `src/components/Section.astro`: the label column and content column every section shares,
  with the hairline that draws itself over the content.
- `src/scripts/motion.ts`: scroll motion: reveals, drawing hairlines, the about
  statement, the active nav link and the progress bar.
- `src/components/Mark.astro`: the asterisk mark.
- `src/components/Icon.astro`: the few inline SVG icons (mail, LinkedIn, GitHub, download).
- `src/styles/global.css`: tokens and the shared `label`, `entry`, `tags` and `button` classes.
- `public/_headers`: security headers and cache rules.
- `public/og-en.png`, `public/og-es.png`: the 1200x630 link preview images (`og:image` in
  `BaseLayout.astro`), one per locale because the role differs.
- `astro.config.mjs`, `wrangler.jsonc`: build and Worker config.

## Data

None of its own. Copy comes from `src/i18n`, facts from `src/data/profile.ts`
(`docs/domains/content.md`).

## Flow

1. A request for `/` reaches the Worker and is redirected to `/en/` (`docs/decisions.md`, D6).
2. `/en/` and `/es/` are static files served by Cloudflare without running the Worker.
3. In the browser three scripts load: `ribbon.ts` (hero canvas), `motion.ts` (scroll motion)
   and `chat.ts` (assistant).

## Invariants

- Section ids come from `SECTIONS` and are the same in every locale: the nav links, the
  assistant's tool and `Section.astro` all rely on it.
- No inline scripts or styles anywhere, or the Content Security Policy blocks them
  (`docs/decisions.md`, D4).
- Every page sets `lang`, a canonical URL and hreflang alternates for all locales.
- Motion respects `prefers-reduced-motion`: the ribbon draws one still frame, CSS
  animations are cut in `global.css` and `motion.ts` does not start.
- The page reads complete without JavaScript: `[data-reveal]` content is hidden only once
  `motion.ts` sets `data-motion` on the root element.

## Gotchas

- `_headers` applies to static assets only. Responses built by the Worker (`/`, `/api/chat`)
  set their own headers in code.
- The build splits into `dist/client/` (served as assets) and `dist/server/` (the Worker, never
  served). `wrangler deploy` finds the generated `dist/server/wrangler.json` through
  `.wrangler/deploy/config.json`, so `wrangler.jsonc` must not set `main` or `assets`.
- Astro inlines small scripts and stylesheets by default. `assetsInlineLimit: 0` and
  `inlineStylesheets: 'never'` in `astro.config.mjs` turn that off; removing them breaks the
  site under the Content Security Policy with no build error; only the smoke test in CI
  (`e2e/smoke.e2e.ts`) catches it.
- Elements created by a script do not get Astro's scoped style attribute. Styles for them are
  global (`Chat.astro` uses `is:global`).
- In a scoped `<style>`, `:global()` nested inside `:not()` is left uncompiled and the rule
  never matches. Selectors that depend on state set by a script (`is-in`, `is-lit` on words,
  `data-motion`) live in `global.css` instead.
- The share images are static PNGs rendered once from the hero's design (role, name, ribbon,
  host). They do not follow changes to `role`, `profile.name`, the palette or the production
  origin: re-render both when one of those changes. Social networks cache previews, so
  refresh them afterwards (LinkedIn Post Inspector).
- Images imported from `src/assets` are also emitted at their original size. Keep sources
  small: the build publishes them.

## Related

- `DESIGN.md`: the visual rules these files implement.
- `docs/decisions.md`: D2, D3, D4, D5, D6.
- `docs/operations.md`: deploy and local commands.
