# Decisions

Why the portfolio is built the way it is. One entry per structural decision, newest last.
Append an entry when you make or reverse one; never rewrite an old entry, mark it superseded
instead.

Template:

```
## D<n>. <Title> (<YYYY-MM-DD or "historical">)
Status: accepted | superseded by D<m>
Context: what forced the choice.
Decision: what was chosen.
Consequences: what it costs, what it rules out.
```

## D1. Astro, fully static, on GitHub Pages (historical)
Status: superseded by D2
Context: a personal site with no backend, where load time and a perfect Lighthouse score
mattered most.
Decision: Astro with `output: 'static'`, deployed to GitHub Pages, with the assistant calling
OpenAI straight from the browser through a `PUBLIC_OPENAI_API_KEY` variable.
Consequences: no server to run, but any key the assistant used was readable by every visitor.

## D2. Chat goes through a server endpoint on Cloudflare Workers (2026-11-11)
Status: accepted
Context: the key configured under D1 was embedded in the client bundle and leaked. A static
host cannot keep a secret.
Decision: keep the pages static and add `@astrojs/cloudflare`. Two routes run in a Worker:
`/api/chat`, the only code that reads the key, and `/`, which redirects by language. The
endpoint fixes the system prompt, model, tool and output cap, validates input, checks the
origin and rate limits per IP.
Consequences: the site now depends on Cloudflare and has a small server surface to maintain.
The endpoint is still public, so abuse is bounded (rate limit, token cap, provider budget),
not impossible.

## D3. One route per language instead of a client-side text swap (2026-11-11)
Status: accepted
Context: Spanish was applied in the browser by swapping `data-es` attributes, so search engines
only saw English and every string existed twice in the markup.
Decision: `/en/` and `/es/` are prerendered from typed dictionaries (`src/i18n`); `/` redirects
by `Accept-Language`.
Consequences: every visible string must exist in both dictionaries, which the `Dictionary`
type enforces at build time. Switching language reloads the page and resets the assistant.

## D4. No inline code, strict Content Security Policy (2026-11-11)
Status: accepted
Context: the assistant renders model output next to the visitor's session, so script
injection is the main client-side risk.
Decision: `public/_headers` sets `script-src 'self'` and `style-src 'self'`. The build is
configured to never inline scripts or styles (`astro.config.mjs`), fonts are self-hosted, and
chat messages are written with `textContent` only.
Consequences: no `is:inline` scripts, no `style` attributes, no third-party scripts or fonts,
and no View Transitions router (it injects inline code). Analytics would need a same-origin
script or a header change.

## D5. Single page, no project detail pages (2026-11-11)
Status: accepted
Context: each project has a one-line description and a single paragraph of detail, which is
not enough to carry a page of its own.
Decision: projects, education and certifications live as sections of the home page. The
paragraph of detail sits in a native `details` element under each project.
Consequences: nothing to navigate to but sections, so the assistant has one tool
(`show_section`). A project that earns a real write-up gets its own page then.
