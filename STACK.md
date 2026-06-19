# STACK.md — Technical Stack Definition

> Companion document to `DESIGN.md`. Defines the full technical implementation stack for the AI Engineer portfolio. The agent must follow these technology choices exactly — no substitutions without explicit instruction.

---

## 1. Philosophy: Fast by Default

This portfolio is a **static site**. Zero server-side computation at runtime. Every page is pre-rendered HTML at build time, served from a CDN edge node. The result: near-instant load regardless of where the visitor is in the world.

**Target metrics:**
- Lighthouse Performance: **100 / 100**
- First Contentful Paint: **< 0.8s**
- Time to Interactive: **< 1s**
- Total JS shipped to browser: **< 50KB** (excluding GSAP, which loads async)
- Core Web Vitals: all green

The animation layer is the only "heavy" part and it loads **after** the page is interactive — never blocking.

---

## 2. Core Framework: Astro 5

**Version:** `astro@5.x` (latest stable)

**Why Astro:**
- Ships **zero JavaScript by default** — HTML is fully static
- Island Architecture: interactive components only hydrate where needed
- Native **View Transitions API** support — page transitions without React Router overhead
- Content Collections with TypeScript schemas for type-safe data
- Built-in image optimization (`<Image />` component)
- 100 Lighthouse score out of the box, consistently
- 40% faster page load vs Next.js for content sites, 90% less JS

**Rendering mode:** `output: 'static'` (SSG) — full static generation at build time.

**Init command:**
```bash
npm create astro@latest -- --template minimal --typescript strict
```

---

## 3. Styling: Tailwind CSS v4

**Package:** `@astrojs/tailwind` + `tailwindcss@4.x`

**Why Tailwind v4:**
- CSS-native custom properties — zero-runtime, ships as plain CSS
- Utility-first keeps styles co-located with markup in `.astro` files
- `@theme` block in CSS replaces `tailwind.config.js` for cleaner design tokens

**Tailwind config approach (v4 style — in `src/styles/global.css`):**
```css
@import "tailwindcss";

@theme {
  /* Map DESIGN.md tokens into Tailwind utilities */
  --color-bg: #0A0A0F;
  --color-surface: #111118;
  --color-surface-2: #1A1A24;
  --color-border: #2A2A3A;
  --color-border-glow: #4F4F7A;
  --color-text-primary: #F0F0FA;
  --color-text-secondary: #8888AA;
  --color-text-muted: #4A4A6A;
  --color-accent: #7C6FF7;
  --color-accent-2: #00D4AA;

  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

**All colors, spacing, and font choices come from `DESIGN.md`.** Do not introduce colors not defined there.

---

## 4. Animation Stack

This is where the portfolio stands out. Three layers of animation, each with a clear responsibility.

---

### 4.1 GSAP + ScrollTrigger (primary animation engine)

**Package:** `gsap@3.x` (install via npm; Bonus Plugins require Club GreenSock but we use only free plugins)

```bash
npm install gsap
```

**Used for:**
- Hero text character-by-character reveal (SplitText-style, manual implementation to avoid paid plugin)
- Scroll-triggered section reveals (`ScrollTrigger`)
- Card stagger animations on scroll
- Navbar background transition on scroll
- Marquee / ticker animations (if used)
- Any timeline-based sequenced animations

**GSAP must be initialized in a `<script>` tag inside `.astro` components**, not imported as a module at the top level, to avoid SSR issues:

```astro
<!-- Correct pattern in Astro -->
<script>
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  // Hero reveal
  gsap.from('.hero-char', {
    opacity: 0,
    y: 40,
    stagger: 0.04,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.2,
  });
</script>
```

**ScrollTrigger patterns to use:**

```javascript
// Section reveal (apply to all .reveal elements)
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 32,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  });
});

// Staggered card grid reveal
gsap.from('.project-card', {
  opacity: 0,
  y: 48,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.projects-grid',
    start: 'top 80%',
    once: true,
  },
});

// Skill pills cascade
gsap.from('.stack-pill', {
  opacity: 0,
  scale: 0.85,
  duration: 0.4,
  stagger: 0.03,
  ease: 'back.out(1.4)',
  scrollTrigger: {
    trigger: '.stack-grid',
    start: 'top 85%',
    once: true,
  },
});
```

**Performance rules for GSAP:**
- Always use `will-change: transform` on animated elements
- Prefer `transform` and `opacity` — never animate `width`, `height`, `top`, `left`
- Use `force3D: true` on scale/translate animations
- Kill ScrollTrigger instances on page leave (critical with View Transitions)

---

### 4.2 Lenis (smooth scroll)

**Package:** `lenis@1.x`

```bash
npm install lenis
```

**Why Lenis:** Native browser scroll is choppy on most OS/browser combos. Lenis replaces it with a spring-physics easing that makes the whole page feel premium. It pairs natively with GSAP ScrollTrigger.

**Setup (in a global script, loaded once):**

```javascript
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Sync Lenis with GSAP ScrollTrigger — critical
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

**On View Transitions:** Destroy and re-create Lenis on `astro:after-swap` to avoid scroll position bugs:

```javascript
document.addEventListener('astro:after-swap', () => {
  lenis.destroy();
  // re-initialize lenis
});
```

---

### 4.3 Astro View Transitions (page transitions)

**Built-in — no extra package needed.**

Add `<ViewTransitions />` to the base layout `<head>`. This gives SPA-like page transitions with zero JavaScript overhead added to the bundle.

```astro
---
// src/layouts/BaseLayout.astro
import { ViewTransitions } from 'astro:transitions';
---
<html lang="en">
  <head>
    <ViewTransitions />
    <!-- ... -->
  </head>
</html>
```

**Custom transitions on elements:**

```astro
<!-- Hero image morphs into project thumbnail on nav -->
<img
  src={project.image}
  transition:name={`project-${project.slug}`}
  transition:animate="fade"
/>
```

**Page transition animation (cross-fade + slide):**
```astro
<main transition:animate="slide">
  <!-- page content -->
</main>
```

**Lifecycle hooks** (use these to re-init GSAP and Lenis after transitions):
```javascript
document.addEventListener('astro:before-swap', () => {
  // Kill all ScrollTrigger instances
  ScrollTrigger.getAll().forEach(t => t.kill());
  lenis?.destroy();
});

document.addEventListener('astro:after-swap', () => {
  // Re-init GSAP animations and Lenis
  initAnimations();
  initLenis();
});
```

---

### 4.4 Particle Canvas (hero background)

**No library — vanilla Canvas API.** Keeps the dependency count low and gives full control.

Implemented as a self-contained `<canvas>` element in the Hero component, initialized with a `<script>` tag. See `DESIGN.md §5.2` for the visual spec.

**Performance rules:**
- Use `requestAnimationFrame` loop, never `setInterval`
- Keep particle count ≤ 80 on desktop, ≤ 40 on mobile
- Throttle mouse-move handler with `requestAnimationFrame`
- Use `devicePixelRatio` for crisp rendering on retina
- Wrap in `ResizeObserver` to handle viewport changes

---

## 5. Project Structure

```
portfolio/
├── astro.config.mjs
├── tailwind.config.mjs        ← only if using v3; v4 uses CSS @theme
├── tsconfig.json
├── package.json
│
├── public/
│   ├── fonts/                 ← self-host fonts (optional, for max perf)
│   ├── og-image.jpg           ← Open Graph image
│   └── favicon.svg
│
├── src/
│   ├── content/
│   │   ├── config.ts          ← Content Collections schema
│   │   ├── projects/          ← One .md or .mdx per project
│   │   │   ├── project-1.md
│   │   │   └── project-2.md
│   │   └── experience/        ← One .md per job role
│   │       ├── role-1.md
│   │       └── role-2.md
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro   ← ViewTransitions, meta, fonts, global scripts
│   │
│   ├── pages/
│   │   ├── index.astro        ← Home (all sections)
│   │   └── projects/
│   │       └── [slug].astro   ← Dynamic project detail page
│   │
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro         ← Particle canvas + hero content
│   │   ├── About.astro
│   │   ├── Projects.astro     ← Bento grid
│   │   ├── ProjectCard.astro
│   │   ├── Stack.astro        ← Tech pill grid
│   │   ├── Experience.astro   ← Timeline
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   │
│   ├── scripts/
│   │   ├── animations.ts      ← GSAP init, ScrollTrigger setup, all reveals
│   │   ├── lenis.ts           ← Lenis init + GSAP sync
│   │   └── particles.ts       ← Canvas particle system
│   │
│   └── styles/
│       └── global.css         ← @import tailwindcss, @theme tokens, base resets
```

---

## 6. Content Collections Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    metrics: z.string().optional(),    // e.g. "40% latency reduction"
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
    order: z.number().default(99),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),            // "2022-03"
    endDate: z.string().optional(),   // omit if current
    current: z.boolean().default(false),
    stack: z.array(z.string()),
    impact: z.string().optional(),    // key metric
    order: z.number().default(99),
  }),
});

export const collections = { projects, experience };
```

---

## 7. `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  image: {
    // Astro built-in image optimization
    format: ['avif', 'webp'],
  },
  vite: {
    build: {
      // Code split for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ['gsap'],
            lenis: ['lenis'],
          },
        },
      },
    },
  },
});
```

---

## 8. Package List

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "gsap": "^3.12.0",
    "lenis": "^1.1.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

**Nothing else.** No React, no Vue, no Svelte. No icon library (use inline SVG or a minimal CDN import). No animation library other than GSAP + Lenis.

---

## 9. Performance Rules (non-negotiable)

### Images
- Always use Astro's `<Image />` component, never bare `<img>` tags for content images
- Specify `width` and `height` to prevent layout shift (CLS = 0)
- Use `loading="lazy"` for below-the-fold images
- Use `loading="eager"` + `fetchpriority="high"` only for the hero avatar/image
- Format priority: `avif` → `webp` → `jpg`

### Fonts
- Load via Google Fonts with `display=swap` in `<head>` using `<link rel="preload">`
- Add `<link rel="preconnect" href="https://fonts.googleapis.com">` before the font link
- Only load the weights actually used (see DESIGN.md §3)

### Scripts
- All GSAP/Lenis scripts go in `<script>` tags (Astro processes these through Vite, bundles and splits automatically)
- Never use `is:inline` for GSAP scripts — let Astro bundle them
- Use `is:inline` only for tiny, critical inline scripts (e.g. theme detection)

### CSS
- No unused CSS shipped — Tailwind v4 purges automatically
- No `@import` of external CSS files at runtime (fonts via `<link>`, not `@import url()`)

### Core Web Vitals targets
| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 1.2s |
| FID / INP (Interaction to Next Paint) | < 100ms |
| CLS (Cumulative Layout Shift) | 0.00 |
| FCP (First Contentful Paint) | < 0.8s |
| TTFB (Time to First Byte, from CDN) | < 200ms |

---

## 10. Deployment

**Platform:** Netlify (recommended for Astro static sites — zero-config, free tier covers personal portfolios)

**Alternative:** Vercel or Cloudflare Pages — both work with `output: 'static'` without an adapter.

**Build settings (Netlify UI or `netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

The `Cache-Control: immutable` on `/assets/*` is critical — Astro hashes all asset filenames, so they can be cached forever and load instantly on repeat visits.

---

## 11. Development Commands

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Type-check
npx astro check
```

---

## 12. Animation Implementation Checklist

The agent must implement all of these before considering the portfolio complete:

- [ ] **Hero text reveal** — each word or character fades + slides up on load with GSAP stagger
- [ ] **Particle canvas** — ambient neural-network dots in hero, mouse-reactive
- [ ] **Lenis smooth scroll** — initialized globally, synced with ScrollTrigger
- [ ] **Section reveals** — all `<section>` elements and headings animate in on scroll
- [ ] **Project card hovers** — border glow + subtle lift via CSS `transition` (not GSAP)
- [ ] **Card grid stagger** — cards animate in with 80-100ms stagger on ScrollTrigger
- [ ] **Skill pill cascade** — pills animate in with scale + opacity stagger
- [ ] **Timeline entries** — experience items slide in from left with stagger
- [ ] **Nav scroll state** — glassmorphism blur increases on scroll (GSAP or CSS `scroll-driven-animations`)
- [ ] **View Transitions** — enabled in BaseLayout, custom names on project images
- [ ] **GSAP cleanup** — all ScrollTrigger instances killed on `astro:before-swap`
- [ ] **Lenis cleanup** — destroyed and re-created on page transitions
- [ ] **Reduced motion** — all animations disabled via `prefers-reduced-motion: reduce`
- [ ] **Mobile performance** — particle count halved, heavy animations simplified

---

## 13. Key Gotchas (read before coding)

1. **GSAP in Astro:** Never import GSAP at the module top level in `.astro` files. Always use `<script>` blocks — Astro bundles these through Vite properly and avoids SSR conflicts.

2. **ScrollTrigger + Lenis:** You MUST call `lenis.on('scroll', ScrollTrigger.update)` and tick Lenis inside `gsap.ticker.add()`. If you don't, scroll-triggered animations will fire at wrong positions.

3. **View Transitions + GSAP:** Every time a page transition happens, ScrollTrigger instances from the previous page persist in memory unless you kill them on `astro:before-swap`. This causes ghost animations and memory leaks.

4. **Canvas DPR:** Always set `canvas.width = canvas.offsetWidth * window.devicePixelRatio` and scale the context with `ctx.scale(dpr, dpr)`. Without this, the particle canvas looks blurry on Retina displays.

5. **Tailwind v4 + Astro:** As of 2025, use `@astrojs/tailwind` with `applyBaseStyles: false` if you define your own reset, to avoid double-applying Preflight.

6. **`transition:name` uniqueness:** Every element using `transition:name` must have a globally unique name. Duplicates cause broken View Transitions.

7. **Image optimization:** Astro's `<Image />` component only works with local images or images from allowed domains configured in `astro.config.mjs`. Add external image domains to `image.domains` if needed.