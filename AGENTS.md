# AGENTS.md

Entry point for every AI agent working in this repository. It is always loaded, so it stays
short: what the portfolio is, the rules that apply to every task, where the rest of the
knowledge lives, and how to keep that knowledge current.

## 1. How to work here

1. **Read this file, then only what the task needs.** The documentation is split by scope
   (Section 3). Open the files the task touches in the map before writing code; do not read
   everything.
2. **These docs win over your defaults.** `AGENTS.md` files, `docs/` and `DESIGN.md` (when it
   exists) are the source of truth for architecture, patterns, style and design. Process skills
   say how to work, not what the rules are; on any conflict, these docs win.
3. **Apply the rules silently.** Do not announce which rule you are applying.
4. **The code is ground truth for structure.** Do not invent directories, layers or
   conventions. When a doc and the code disagree, trust the code and fix the doc (Section 4).
5. **Leave the docs as current as the code** (Section 4). A task is not done while a doc still
   describes the old behaviour.

## 2. Project

Personal website of Jaume Cortés, AI Engineer: one page per language (`/en/`, `/es/`) with his
profile, experience, projects and contact, plus an assistant that answers questions about him
and scrolls the page to the relevant section. The pages are static; the assistant talks to a
small server endpoint that keeps the model key off the browser.

| Layer | Technology |
|---|---|
| Framework | Astro 5, TypeScript (strict) |
| Styles | Plain CSS with custom properties, scoped per component |
| Fonts | League Spartan, Roboto, Roboto Mono (self-hosted through Fontsource) |
| Server | Cloudflare Workers through `@astrojs/cloudflare` (`/` and `/api/chat` only) |
| Model | OpenAI chat completions, called from the Worker |
| Tests | Vitest |

<!-- check-docs: map -->
```
portfolio/
├── AGENTS.md               # This file
├── CLAUDE.md               # Imports AGENTS.md for Claude Code
├── DESIGN.md               # Visual system: palette, type, layout, signature
├── README.md               # Human front door
├── astro.config.mjs        # Astro config: adapter, sitemap, no inline scripts or styles
├── wrangler.jsonc          # Worker config: name, assets, rate limit binding
├── .dev.vars.example       # Template for local secrets
├── docs/                   # Code style, workflow, operations, decisions, domains
├── public/                 # Files served as is: _headers, robots.txt, favicon, CVs, project images
├── scripts/                # check-docs.mjs
├── src/
│   ├── assets/             # Images optimized at build time
│   ├── components/         # Astro components
│   ├── data/               # Language-neutral profile data
│   ├── i18n/               # Locales, dictionaries, locale helpers
│   ├── layouts/            # BaseLayout.astro
│   ├── lib/chat/           # Server-side chat logic: validation, prompt, stream parser
│   ├── pages/              # Routes: index.ts, [lang]/index.astro, api/chat.ts, 404.astro
│   ├── scripts/            # Browser scripts: chat.ts, ribbon.ts, motion.ts
│   └── styles/             # global.css: tokens and shared primitives
├── .githooks/              # commit-msg and pre-commit
└── .github/                # CI workflows, issue and pull request templates
```

## 3. Documentation map

Each kind of fact has exactly one home. Read the home before working in its area; update it
when the area changes.

| Home | Owns | Read it when |
|---|---|---|
| `AGENTS.md` | Global rules, doc map, doc maintenance, workflow, communication | Always (auto-loaded) |
| `docs/code-style.md` | Naming, comments, docblocks, test layout | Writing or editing any code or test |
| `docs/workflow.md` | Issue format, commit format, closing comment | Starting, committing or closing a task |
| `docs/domains/*.md` | How each feature works: data, flow, invariants, gotchas | Touching that feature (table below) |
| `docs/operations.md` | Environment variables, jobs, deploy, CI, costs | Env vars, jobs, deploy, CI, cost questions |
| `docs/decisions.md` | Why the structural choices were made (decision log) | Proposing a structural change |
| `DESIGN.md` | Palette, typography, layout rules and the hero ribbon | Touching any markup or style |

**Domains** (`docs/domains/`):

| File | Covers |
|---|---|
| `site.md` | Pages, layout, components, routing by locale, security headers |
| `chat.md` | The assistant: browser panel, `/api/chat` endpoint, limits and abuse controls |
| `content.md` | Profile data and the English and Spanish dictionaries |

## 4. Keeping the docs current

The docs are only useful while they match the code. Treat them as part of the change, never as
follow-up work.

**Same commit.** A change that makes a documented statement false, or adds something a doc
inventories, updates that doc in the same commit:

| When you... | Update |
|---|---|
| Add, rename or delete a file in a mapped folder | The file map that lists it (`AGENTS.md` Section 2 or a scoped `AGENTS.md`) |
| Add or change a table, field meaning, flow or invariant | The owning `docs/domains/*.md` |
| Add an env var or a scheduled job; change deploy or CI | `docs/operations.md` |
| Make a structural decision or reverse one | Append an entry to `docs/decisions.md` |
| Add a new feature area | A new `docs/domains/<area>.md` and its row in Section 3 |
| Change a rule or convention | The `AGENTS.md`, `docs/code-style.md` or `docs/workflow.md` that owns it |
| Change what the project does, its stack or how to run it | `README.md` |
| Change a colour, font, spacing rule or the hero ribbon | `DESIGN.md` |

**How to write them.**
- **One fact, one home.** Elsewhere, link to it; never copy it. Duplicates are what drift.
- **Verify before writing.** Check every claim against the code. Replace a stale statement;
  never append a second, contradictory one next to it.
- **Write what the code cannot say:** purpose, invariants, the why, cross-file flows and traps.
  Do not restate what a signature or a file name already tells.
- **Point by path and symbol, never by line number** (`orders.ts` → `createOrder`), so a
  reference survives edits.
- **Domain docs keep one template:** Purpose, Key files, Data, Flow, Invariants, Gotchas,
  Related. Keep each under ~200 lines; split by sub-area when it grows past that.
- **This file stays under ~250 lines.** Detail goes to the scoped files; only rules that apply
  to every task live here.
- English, no em dash (U+2014), same tone as the rest.

**Before calling a task done:** search the docs for every file and symbol you touched
(`rg -n "<name>" AGENTS.md docs`) and fix whatever no longer holds. Then run
`node scripts/check-docs.mjs` (also blocking in CI and in the pre-commit hook): it fails on an
em dash, a `@returns` tag, a broken relative link, a mapped file that no longer exists, a file
missing from a strict map, or a doc under `docs/` that no `AGENTS.md` mentions.

## 5. Rules for every task

- **Never hardcode secrets.** Environment variables only (`docs/operations.md`).
- **Never expose internal errors to the client.** Log the detail, return a stable error.
- **Never trust external data.** Validate every external response and user input at the
  boundary where it enters.
- **English everywhere** in code, comments, docs, issues and commits. **Never an em dash
  (U+2014)**: use a comma, colon, semicolon, period or parentheses.
- **Every exported or public function, class, hook and component carries a Google-style
  docblock** (`@return`, never `@returns`; Python: `Args:`, `Returns:`, `Raises:`). Format and
  examples in `docs/code-style.md`.
- **No secret ever reaches the browser.** Never read a secret through a `PUBLIC_` variable or
  `import.meta.env` in code that ships to the client. The model key is read only in
  `src/pages/api/chat.ts`, from the Worker environment.
- **No inline scripts or styles.** The Content Security Policy in `public/_headers` allows
  same-origin files only: no `is:inline` scripts, no `style` attributes, no third-party hosts.
- **Every visible string lives in both dictionaries** (`src/i18n/en.ts`, `src/i18n/es.ts`).
  Dictionary values are the one exception to "English everywhere".
- **Never invent profile facts.** Content comes from the CV; when something is missing, ask.

## 6. Workflow

Full formats in `docs/workflow.md`.

- **Issue first.** Before starting a task, create its GitHub issue (Context, Goal, Steps,
  Constraints, Acceptance criteria; labels `type:`, `area:`, `size:`, `priority:`). Unless the
  user says otherwise.
- **Commits:** one line, Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`,
  `chore:` ...), English, no body, no `Co-Authored-By` trailer or any other attribution. Docs
  updated in the same commit.
- **Close the loop.** After committing, comment on the issue in English: the commit sha, what
  changed and why. Close it if complete; otherwise list what is still missing.
- **Gate before calling a task done:** `npm run check`, `npm test`, `npm run build`, and `node scripts/check-docs.mjs`.
- **Agents commit, the user pushes. Never run git push.**

## 7. Communication style

Respond concisely. No filler, no pleasantries, no hedging ("it might be worth considering").
Code, technical terms and error messages exact. Git commits, issues and PRs are written
normally (formats in `docs/workflow.md`).

### Decision analysis

Before answering any question about a task or a decision, or before taking one, analyse it
first. Read the code, the issue and any external source involved. Then answer with this
structure, short:

- **Value:** what it adds to the system and to the user.
- **Effort:** what it takes to build (size, files, risk).
- **Costs:** money, infrastructure usage, storage, maintenance. Say "none" when there are none.
- **Source:** where the data or information comes from (only when relevant).
- **Verdict:** whether it is worth it, and whether you would do it or not, with the reason.

Never recommend or decide without that analysis behind it.
