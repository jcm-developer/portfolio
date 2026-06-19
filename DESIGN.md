# DESIGN.md — AI Engineer Portfolio

> Reference document for Claude agent. Build a personal portfolio website for an AI Engineer using this design system as the single source of truth. All design decisions, color values, typography, layout structures, and component behaviors are defined here.

---

## 1. Design Concept

**Direction:** *Dark Precision / AI-era Luxury*

The aesthetic belongs to the same visual language as Linear, Vercel, and Raycast — tools built by engineers, for engineers. The portfolio reads as a precision instrument: dark, structured, fast, trustworthy. No decorative noise. Every element earns its space.

**Mood:** Midnight terminal meets editorial magazine. Dense but airy. Technical but human.

**The Signature Element:** A subtle animated particle/neural-network background on the hero — rendered in canvas or CSS, low opacity, reacting faintly to mouse position. It communicates "AI" without screaming it.

---

## 2. Color Palette

```
--color-bg:           #0A0A0F   /* Near-black, slight blue undertone */
--color-surface:      #111118   /* Card/panel background */
--color-surface-2:    #1A1A24   /* Elevated surface (modals, hover) */
--color-border:       #2A2A3A   /* Subtle borders */
--color-border-glow:  #4F4F7A   /* Border on focus/active */

--color-text-primary: #F0F0FA   /* Main body text */
--color-text-secondary:#8888AA  /* Labels, captions, metadata */
--color-text-muted:   #4A4A6A   /* Disabled, placeholders */

--color-accent:       #7C6FF7   /* Electric violet — primary CTA, links */
--color-accent-glow:  rgba(124, 111, 247, 0.15) /* Glow for cards/buttons */
--color-accent-2:     #00D4AA   /* Teal — secondary accent, success states */

--color-gradient-hero: linear-gradient(135deg, #0A0A0F 0%, #0D0D1A 50%, #0A0F1A 100%)
--color-gradient-card: linear-gradient(145deg, #111118, #1A1A24)
```

**Palette rationale:** Violet as the primary accent reads as "AI / ML" without being cliché blue. The teal secondary is used sparingly for skill badges and positive metrics. No red in this palette — it's not a danger dashboard.

---

## 3. Typography

```
Display face:  "Space Grotesk"  — weights 500, 700
               Used for: Hero headline, section titles, project names
               Character: geometric, technical, modern — not generic sans

Body face:     "Inter"          — weights 400, 500
               Used for: Paragraphs, descriptions, nav labels
               Character: maximally readable at small sizes

Mono face:     "JetBrains Mono" — weights 400, 500
               Used for: Code snippets, tech stack labels, terminal lines
               Character: immediately signals "engineer"
```

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Type scale:**
```
--text-hero:   clamp(3rem, 8vw, 6.5rem) / font-weight: 700 / letter-spacing: -0.03em
--text-h2:     clamp(1.75rem, 4vw, 2.75rem) / font-weight: 700 / letter-spacing: -0.02em
--text-h3:     clamp(1.25rem, 2.5vw, 1.5rem) / font-weight: 500
--text-body:   1rem (16px) / line-height: 1.7
--text-small:  0.875rem / line-height: 1.6
--text-mono:   0.8125rem / line-height: 1.6
```

---

## 4. Spacing & Layout

**Grid:** 12-column CSS grid, max-width `1200px`, centered, `padding: 0 24px` on mobile.

**Spacing scale (8px base):**
```
--space-1:  8px
--space-2:  16px
--space-3:  24px
--space-4:  32px
--space-6:  48px
--space-8:  64px
--space-12: 96px
--space-16: 128px
```

**Section padding:** `padding: var(--space-16) 0` on desktop, `var(--space-8) 0` on mobile.

**Border radius:**
```
--radius-sm: 6px    /* inline tags, badges */
--radius-md: 12px   /* cards */
--radius-lg: 20px   /* bento panels */
--radius-pill: 999px /* skill pills */
```

---

## 5. Page Sections (in order)

### 5.1 Navigation

- Fixed top bar, `backdrop-filter: blur(20px)`, background `rgba(10, 10, 15, 0.8)`
- Left: name or initials logo in `Space Grotesk 700`
- Right: nav links `About · Projects · Stack · Contact`
- Active link: underline in `--color-accent`
- Mobile: hamburger → full-screen overlay menu
- Height: `64px`

---

### 5.2 Hero Section

**Layout:** Full viewport height (`100vh`), centered content, particle canvas behind.

**Content structure:**
```
[small mono label]  "AI Engineer · Valencia, Spain"

[Hero headline]     "{Name}" — two lines max
                    "Building intelligent
                     systems that scale."

[Subline]           One sentence. What the person does and for whom.
                    Example: "I design and ship AI pipelines, LLM applications,
                    and agentic systems for production environments."

[CTA row]           [Primary button: "View Projects"]  [Ghost button: "Download CV"]

[Scroll indicator]  Animated down-arrow, fades out on scroll
```

**Particle background:** Canvas element, `z-index: 0`, drawing ~80 small dots connected by lines when close, slow drift animation. Accent color `#7C6FF7` at `opacity: 0.3`. Mouse proximity increases opacity slightly.

**Hero headline animation:** Characters appear via `opacity` + `translateY` stagger on load, 60ms delay per char.

---

### 5.3 About Section

**Layout:** 2-column on desktop (60% text / 40% visual), 1-column stacked on mobile.

**Left column — text:**
- `<h2>` section title: `"About me"`
- 2–3 short paragraphs pulled from CV. Tone: first person, direct, confident. No buzzword soup.
- One pull quote or key stat highlighted in `--color-accent`

**Right column — visual:**
- Avatar/photo in a rounded square container with a subtle `box-shadow: 0 0 40px var(--color-accent-glow)`
- Below the photo: 3 stat cards (small bento chips):
  - Years of experience
  - Projects shipped
  - Models fine-tuned (or similar relevant metric from CV)

---

### 5.4 Projects Section

**Heading:** `"Selected Work"` — left-aligned with a `<span class="accent-dot">` in violet.

**Layout:** Bento grid
- Row 1: 1 featured card (full width or 2/3 + 1/3)
- Row 2+: 2 or 3 equal cards per row

**Project card anatomy:**
```
┌──────────────────────────────────────┐
│  [Project visual / screenshot / icon]│
│                                      │
│  ┌── Tag chips (LLM · RAG · Python) ┐│
│  │                                  ││
│  │  Project Title                   ││
│  │  Short description (2 lines max) ││
│  │                                  ││
│  │  [→ View case study]             ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

**Card styles:**
- Background: `--color-gradient-card`
- Border: `1px solid var(--color-border)`
- On hover: border transitions to `--color-border-glow`, `box-shadow` adds `--color-accent-glow`
- Transition: `300ms ease`
- Featured card: slightly larger, may include a metrics banner (e.g. `"40% latency reduction"`)

**Tag chips:** `background: rgba(124,111,247,0.1)`, `color: var(--color-accent)`, mono font, small.

---

### 5.5 Tech Stack Section

**Heading:** `"Stack & Tools"`

**Layout:** Flowing pill grid (flex-wrap), centered, with subtle category separators.

**Categories:**
- AI/ML: PyTorch, TensorFlow, Hugging Face, LangChain, LlamaIndex, OpenAI API, Anthropic API
- Languages: Python, TypeScript, Bash
- Infra: Docker, Kubernetes, AWS, GCP, MLflow, Airflow
- Dev: Git, FastAPI, PostgreSQL, Redis

**Pill style:**
```css
.stack-pill {
  font-family: 'JetBrains Mono';
  font-size: 0.75rem;
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text-secondary);
  background: var(--color-surface);
  transition: all 200ms ease;
}
.stack-pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-accent-glow);
}
```

**Each pill populated from CV.** Remove any tech not present in the CV.

---

### 5.6 Experience / Timeline Section

**Heading:** `"Experience"`

**Layout:** Vertical timeline on desktop, left-edge line in `--color-border` with dot nodes in `--color-accent`.

**Each entry:**
```
● [Year range]  Company Name — Role Title
                Short description: 1–2 sentences max.
                Impact metric if available (e.g. "Reduced inference cost by 35%")
                [Tech tags]
```

**Styling:** Entry text in `--color-text-primary`, dates in `--color-text-secondary` mono font. The accent dot `●` glows on hover.

---

### 5.7 Contact Section

**Heading:** `"Let's build something"`

**Layout:** Centered, max-width `600px`.

**Content:**
- Short line: `"Open to senior AI/ML roles, freelance projects, and research collaborations."`
- Primary CTA button: `"Send an email"` → `mailto:` link
- Secondary row: LinkedIn icon link · GitHub icon link
- Optional: Availability badge — `"Available for new projects"` in teal (`--color-accent-2`)

**No contact form** — keep it frictionless. Email link is enough.

---

### 5.8 Footer

- Minimal: `© 2025 {Name} · Built with ♥ and Claude`
- Small mono font, `--color-text-muted`
- Back-to-top link, right-aligned

---

## 6. Components

### Buttons
```css
/* Primary */
.btn-primary {
  background: var(--color-accent);
  color: #fff;
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  border: none;
  cursor: pointer;
  transition: opacity 200ms, transform 150ms;
}
.btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: border-color 200ms, background 200ms;
}
.btn-ghost:hover {
  border-color: var(--color-accent);
  background: var(--color-accent-glow);
}
```

### Accent dot (section titles)
```html
<h2>Selected Work<span class="dot">.</span></h2>
```
```css
.dot { color: var(--color-accent); }
```

### Glassmorphism nav
```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 64px;
  background: rgba(10, 10, 15, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
}
```

### Scroll reveal
Use `IntersectionObserver` to add `.visible` class when elements enter viewport:
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. Animations & Motion

| Element | Animation | Duration |
|---|---|---|
| Hero headline chars | Stagger fadeInUp | 60ms/char |
| Section headings | Fade + slide from left | 400ms |
| Cards on scroll | Fade + slide up | 500ms, stagger 80ms |
| Card hover | Border glow + subtle lift | 300ms |
| Particle canvas | Continuous drift | ambient |
| Nav links | Underline scale from left | 250ms |
| Buttons | Slight translateY(-1px) | 150ms |

**Respect `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Responsive Breakpoints

```
Mobile:   < 768px   — 1 column, reduced type scale, stack all sections
Tablet:   768–1024px — 2 columns where applicable
Desktop:  > 1024px  — full layout as described above
```

Mobile-specific:
- Nav collapses to hamburger
- Hero headline: `clamp` handles size automatically
- Bento grid: 1 column
- Timeline: no side-by-side, just vertical stack

---

## 9. File Structure (if building in HTML/CSS/JS)

```
portfolio/
├── index.html
├── styles/
│   ├── reset.css
│   ├── variables.css     ← all CSS custom properties from this doc
│   ├── layout.css
│   ├── components.css
│   └── animations.css
├── scripts/
│   ├── particles.js      ← canvas particle animation
│   └── scroll-reveal.js  ← IntersectionObserver
└── assets/
    ├── avatar.jpg
    └── projects/
        └── [screenshots or icons]
```

If building in React/Next.js, use Tailwind with custom config extending these design tokens.

---

## 10. Content Slots (populate from CV)

The agent should extract and map CV content into these slots:

| Slot | Source |
|---|---|
| `{name}` | Full name from CV |
| `{tagline}` | Synthesize from CV title/summary |
| `{bio_para_1}` | Background & origin story |
| `{bio_para_2}` | Current focus & expertise |
| `{bio_para_3}` | What drives you / working style |
| `{projects[]}` | Each project: title, description, stack, link, metrics |
| `{experience[]}` | Each role: company, title, dates, description, impact, stack |
| `{stack[]}` | All technologies grouped by category |
| `{contact_email}` | Email from CV |
| `{linkedin_url}` | LinkedIn if present |
| `{github_url}` | GitHub if present |
| `{location}` | City, Country |
| `{availability}` | Derive: "Open to opportunities" or "Currently employed" |

---

## 11. SEO & Meta

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} — AI Engineer</title>
<meta name="description" content="Portfolio of {name}, AI Engineer specializing in {top 2-3 skills from CV}. Based in {location}.">
<meta property="og:title" content="{name} — AI Engineer">
<meta property="og:description" content="...same as meta description...">
<meta property="og:type" content="website">
<link rel="canonical" href="{site_url}">
```

---

## 12. Quality Checklist (agent must verify before finishing)

- [ ] All color values use CSS custom properties, no hardcoded hex in components
- [ ] Typography uses only the three defined typefaces (Space Grotesk, Inter, JetBrains Mono)
- [ ] Nav is sticky and has glassmorphism blur
- [ ] Hero has particle/canvas animation
- [ ] All sections have scroll-reveal animation
- [ ] Cards have hover glow effect
- [ ] Site is fully responsive at 375px, 768px, 1440px
- [ ] `prefers-reduced-motion` is respected
- [ ] All content slots are filled from CV (no placeholder lorem ipsum left)
- [ ] Contact section links to real email and social profiles
- [ ] Page loads fast: no external dependencies beyond Google Fonts + optional one icon library (Lucide or Phosphor)