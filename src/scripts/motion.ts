// Scroll motion for the whole page: content that rises into view, hairlines that draw
// themselves, the about statement that lights up word by word, the active nav link and the
// progress bar. The page reads complete without this script: content is only hidden once it
// sets `data-motion` on the root.

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Fades content in as it enters the viewport; children of `data-stagger` cascade. */
function initReveals(): void {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      (child as HTMLElement).style.setProperty('--i', String(index));
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  root.dataset.motion = '';
}

/** Marks the nav link of the section that crosses the middle of the viewport. */
function initScrollSpy(): void {
  const links = new Map<string, HTMLElement>();
  document.querySelectorAll<HTMLElement>('[data-nav-section]').forEach((link) => {
    if (link.dataset.navSection) links.set(link.dataset.navSection, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link, id) => link.classList.toggle('is-active', id === entry.target.id));
      }
    },
    { rootMargin: '-45% 0px -54% 0px' },
  );
  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

/** Wraps each word of an element in a span so the words can light up one by one. */
function splitWords(element: HTMLElement): HTMLElement[] {
  const words = (element.textContent ?? '').trim().split(/\s+/);
  element.textContent = '';
  return words.map((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    if (index) element.append(' ');
    element.append(span);
    return span;
  });
}

/** Ties the about statement and the progress bar to the scroll. */
function initScrollLinked(): void {
  const statement = document.querySelector<HTMLElement>('[data-words]');
  const words = statement ? splitWords(statement) : [];
  let lit = -1;
  let queued = false;

  function update(): void {
    queued = false;
    const viewport = window.innerHeight;
    const range = root.scrollHeight - viewport;
    root.style.setProperty('--scroll', range > 0 ? clamp(window.scrollY / range).toFixed(4) : '0');

    if (statement) {
      const box = statement.getBoundingClientRect();
      const progress = clamp((viewport * 0.85 - box.top) / (box.height + viewport * 0.3));
      const count = Math.round(progress * words.length);
      if (count !== lit) {
        words.forEach((word, index) => word.classList.toggle('is-lit', index < count));
        lit = count;
      }
    }
  }

  function queue(): void {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  update();
}

initScrollSpy();
if (!reduceMotion) {
  initReveals();
  initScrollLinked();
}
