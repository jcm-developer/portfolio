// src/scripts/i18n.ts
// Client-side language + theme switching with no page reload.
//
// Translation strategy: components render English as the element's text/attribute
// and stamp the Spanish counterpart into `data-es` (text) or `data-es-placeholder`
// (the placeholder attribute). On first apply we capture the original English into
// `data-en` / `data-en-placeholder`, then swap based on the active language.
//
// Both preferences persist in localStorage and are re-applied on every Astro View
// Transition navigation (the page content is swapped, so text must be re-translated).

export type Lang = 'en' | 'es';
export type Theme = 'light' | 'dark';

const LANG_KEY = 'lang';
const THEME_KEY = 'theme';

const THEME_COLORS: Record<Theme, string> = {
  dark: '#0A0A0F',
  light: '#F5F5FA',
};

export function getLang(): Lang {
  try {
    return localStorage.getItem(LANG_KEY) === 'es' ? 'es' : 'en';
  } catch {
    return 'en';
  }
}

export function getTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyLang(lang: Lang): void {
  document.documentElement.lang = lang;

  document.querySelectorAll<HTMLElement>('[data-es]').forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.textContent ?? '';
    const next = lang === 'es' ? el.dataset.es ?? '' : el.dataset.en ?? '';
    // Only write when it actually changes. This avoids needless DOM churn and,
    // crucially, preserves child markup (e.g. the hero's per-word spans) on the
    // initial English render where the target text already equals the content.
    if (el.textContent === next) return;

    if (el.dataset.splitWords !== undefined) {
      // This element (the hero tagline) renders one `.hero-word` span per word
      // for the GSAP stagger reveal and the gradient text clip. A plain
      // textContent swap would flatten those spans and drop the gradient, so we
      // rebuild the word spans for the new language. \s also matches the &nbsp;
      // captured from the SSR markup, so this works swapping in either direction.
      //
      // We CLONE an existing word span rather than create a fresh one: Astro
      // scopes the component styles with a `data-astro-cid-*` attribute on the
      // SSR spans. A `document.createElement` span lacks it, so the scoped
      // `.hero-word` / gradient rules would not match (text renders black, and
      // without inline-block the &nbsp; stops the line from wrapping).
      const template = el.querySelector<HTMLElement>('.hero-word');
      el.replaceChildren(
        ...next
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => {
            const span = template
              ? (template.cloneNode(false) as HTMLElement)
              : document.createElement('span');
            span.className = "hero-word";
            // Trailing non-breaking space matches the SSR markup; a normal space
            // collapses between inline-block spans and would glue words together.
            span.textContent = `${word} `;
            return span;
          })
      );
    } else {
      el.textContent = next;
    }
  });

  document.querySelectorAll<HTMLElement>('[data-es-placeholder]').forEach((el) => {
    if (el.dataset.enPlaceholder === undefined) {
      el.dataset.enPlaceholder = el.getAttribute('placeholder') ?? '';
    }
    const next = lang === 'es' ? el.dataset.esPlaceholder ?? '' : el.dataset.enPlaceholder ?? '';
    el.setAttribute('placeholder', next);
  });

  // Point CV download links at the PDF matching the active language.
  document.querySelectorAll<HTMLAnchorElement>('[data-cv-en]').forEach((el) => {
    const url = lang === 'es' ? el.dataset.cvEs : el.dataset.cvEn;
    if (url) el.setAttribute('href', url);
    el.setAttribute('download', lang === 'es' ? 'Jaume-Cortes-CV-ES.pdf' : 'Jaume-Cortes-CV-EN.pdf');
  });

  // Refresh the toggle button label + accessible name. Write the code into the
  // `.lang-code` element when present (the mobile menu toggle wraps it alongside
  // a text label) and fall back to the button itself (the desktop dock toggle).
  document.querySelectorAll<HTMLElement>('.lang-toggle').forEach((btn) => {
    const codeEl = btn.querySelector<HTMLElement>('.lang-code') ?? btn;
    codeEl.textContent = lang === 'es' ? 'EN' : 'ES';
    btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
  });
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLORS[theme]);

  document.querySelectorAll<HTMLElement>('.theme-toggle').forEach((btn) => {
    btn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'
    );
    btn.setAttribute('aria-pressed', String(theme === 'light'));
  });

  // Let theme-aware canvas effects (e.g. the hero particles) recolor live.
  document.dispatchEvent(new CustomEvent('theme:change', { detail: { theme } }));
}

export function toggleLang(): Lang {
  const next: Lang = getLang() === 'es' ? 'en' : 'es';
  try {
    localStorage.setItem(LANG_KEY, next);
  } catch {
    /* ignore */
  }
  applyLang(next);
  return next;
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* ignore */
  }
  applyTheme(next);
  return next;
}

// Re-apply the stored preferences to the current DOM.
export function syncPreferences(): void {
  applyLang(getLang());
  applyTheme(getTheme());
}
