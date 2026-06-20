// Base-path helpers. Astro replaces `import.meta.env.BASE_URL` at build time
// with the configured `base` (e.g. "/portfolio" on a GitHub Pages project
// site, or "/" at root). Every author-written link must go through here —
// Astro only auto-prefixes its own bundled assets, not hardcoded hrefs.
//
// Note: BASE_URL may or may not carry a trailing slash depending on config,
// so we normalize defensively instead of assuming either form.
export const BASE = import.meta.env.BASE_URL;

/** Prefix an app-relative path with the deploy base, guaranteeing exactly one
 *  slash between them. `withBase('#about')` → "/portfolio/#about";
 *  `withBase('projects/foo')` → "/portfolio/projects/foo". */
export function withBase(path: string): string {
  const base = BASE.replace(/\/$/, '');
  const rest = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rest}`;
}

/** True when the current page is the home (base) route, tolerant of a
 *  trailing slash on either side (GitHub Pages serves "/portfolio/"). */
export function isHome(): boolean {
  const here = window.location.pathname.replace(/\/$/, '');
  const base = BASE.replace(/\/$/, '');
  return here === base;
}
