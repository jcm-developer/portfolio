# Jaume Cortés — AI Engineer Portfolio

A fast, static personal portfolio built with Astro 5, Tailwind CSS v4, GSAP, and Lenis. Dark, precision-instrument aesthetic with an animated particle hero, smooth scrolling, scroll-triggered reveals, View Transitions between pages, and an AI chatbot (OpenAI `gpt-4o-mini`) that answers questions about the owner using data drawn from a single typed source of truth.

---

## Prerequisites

- **Node.js 20+**
- **npm** (ships with Node)

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file and add your OpenAI key
cp .env.example .env
#   then edit .env and set PUBLIC_OPENAI_API_KEY=sk-...

# 3. Start the dev server (http://localhost:4321)
npm run dev
```

The chatbot works without a key — it simply shows a friendly "not configured" message until you add `PUBLIC_OPENAI_API_KEY`.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run `astro check` (type-checking) |

---

## Build & Deploy (Netlify)

This is a fully static site (`output: 'static'`) — it deploys to any static host.

### GitHub Pages via GitHub Actions (primary)

A ready-to-run workflow lives at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). It builds with the official `withastro/action` and publishes to GitHub Pages on every push to `main`.

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main` (or run the workflow manually from the Actions tab). Done.

**Where it deploys / the `base` path — important:**

- **Custom domain or a user/org page** (`<user>.github.io`) → served at the **root**. Nothing to configure; this is the default and everything works as-is. (For a custom domain, add a `CNAME` and set the `SITE_URL` variable below.)
- **Project page** (`<user>.github.io/<repo>`) → served under a **subpath**. Set a repo **variable** `BASE_PATH=/<repo>` (Settings → Secrets and variables → Actions → *Variables*). Astro will then prefix all hashed assets automatically. Note: this portfolio uses some root-relative internal links, so a subpath deploy is **not** the recommended target — prefer a custom domain or a `<user>.github.io` user page for a frictionless result.

**Optional repo variables / secrets** (Settings → Secrets and variables → Actions):

| Name | Type | Purpose |
|---|---|---|
| `SITE_URL` | Variable | Canonical origin for sitemap/meta, e.g. `https://jaumecortes.github.io`. Defaults to `https://jaumecortes.dev`. |
| `BASE_PATH` | Variable | Subpath for project pages, e.g. `/portfolio`. Leave unset for root. |
| `PUBLIC_OPENAI_API_KEY` | Secret | Enables the chatbot in production. ⚠️ `PUBLIC_` keys are embedded in client JS and publicly visible — set OpenAI usage limits. |

### Netlify (alternative; config in [`netlify.toml`](./netlify.toml))

1. Push this repo to GitHub/GitLab.
2. In Netlify, "Add new site" → "Import an existing project".
3. Build command `npm run build`, publish directory `dist` (auto-detected from `netlify.toml`).
4. Add `PUBLIC_OPENAI_API_KEY` under **Site settings → Environment variables**.
5. Deploy.

`netlify.toml` sets `Cache-Control: immutable` for hashed assets and basic security headers. **Vercel** and **Cloudflare Pages** also work with zero adapter — just set the same env variable in their dashboards.

---

## Customization

All personal content lives in **one file**: [`src/data/profile.ts`](./src/data/profile.ts). Nothing personal is hardcoded in components — edit this file and the whole site (and the chatbot's knowledge) updates.

### Update personal data
Edit the `profile` object in `src/data/profile.ts` — name, role, location, email, bio paragraphs, availability, stats, and social URLs (`linkedin` / `github` are currently empty; fill them in to show the social icons in the Contact section).

### Add or edit a project
Add an entry to the `projects` array in `src/data/profile.ts`:

```ts
{
  slug: 'my-project',          // unique, kebab-case (becomes /projects/my-project)
  title: 'My Project',
  description: 'One or two sentences.',
  body: 'Longer description shown on the detail page.',
  stack: ['Python', 'FastAPI'],
  featured: false,             // featured projects render full-width at the top
  metrics: '40% faster',       // optional badge; '' to hide
  year: '2025',
  github: '',                  // optional link
  demo: '',                    // optional link
  image: '',                   // '' renders a styled placeholder
  order: 6,
}
```

A detail page at `/projects/<slug>` is generated automatically.

### Update experience / education / stack
Edit the `experience`, `education`, and `stack` exports in the same file. Stack categories are just object keys — rename, add, or remove them freely.

### Update the CV
Replace the files in [`src/assets/cv/`](./src/assets/cv/):
- `cv_en.pdf` — linked from the "Download CV" button in the hero.
- `cv_es.pdf` — secondary reference.

---

## OpenAI API key — security note

The chatbot calls OpenAI directly from the browser, so the key **must** be prefixed `PUBLIC_` (Astro only exposes `PUBLIC_*` vars to the client). This means **the key is visible in the shipped JavaScript**.

For a low-traffic personal portfolio this is an accepted trade-off, but you should:

- Set **hard monthly usage limits** in the OpenAI dashboard (**Billing → Usage limits**).
- Use a key scoped to a project with a low budget.
- Rotate the key if you ever see unexpected usage.

For a zero-exposure setup, move the `fetch` call behind a serverless function (e.g. a Netlify/Vercel function) and keep the key server-side — but that is beyond this static build.

---

## Tech stack credits

- [Astro 5](https://astro.build) — static site framework & View Transitions
- [Tailwind CSS v4](https://tailwindcss.com) — styling via `@theme` tokens
- [GSAP + ScrollTrigger](https://gsap.com) — animation engine
- [Lenis](https://lenis.darkroom.engineering) — smooth scroll
- [OpenAI API](https://platform.openai.com) — chatbot (`gpt-4o-mini`)
- Fonts: Space Grotesk, Inter, JetBrains Mono (Google Fonts)

---

© Jaume Cortés · Built with ♥ and Astro
