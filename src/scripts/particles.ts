// src/scripts/particles.ts
// Vanilla Canvas particle / neural-network background for the hero.
// Spec: DESIGN.md §5.2, STACK.md §4.4
// Exports initParticles(canvasId) which returns a cleanup function.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const ACCENT_DARK = '124, 111, 247'; // #7C6FF7 — accent on the dark theme
const ACCENT_LIGHT = '91, 79, 214'; //  #5B4FD6 — accent on the light theme
const LINK_DISTANCE = 120;
const MOUSE_RADIUS = 150;

function isLightTheme(): boolean {
  return document.documentElement.getAttribute('data-theme') === 'light';
}

export function initParticles(canvasId: string): () => void {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles: Particle[] = [];
  let rafId = 0;
  let mouseRafQueued = false;

  // Recoloured live when the theme toggles. On the light theme the dots sit on a
  // pale background, so they need a slightly stronger base opacity to read.
  let accent = isLightTheme() ? ACCENT_LIGHT : ACCENT_DARK;
  let baseOpacity = isLightTheme() ? 0.5 : 0.35;
  let linkOpacity = isLightTheme() ? 0.26 : 0.18;

  function applyTheme() {
    const light = isLightTheme();
    accent = light ? ACCENT_LIGHT : ACCENT_DARK;
    baseOpacity = light ? 0.5 : 0.35;
    linkOpacity = light ? 0.26 : 0.18;
  }

  const mouse = { x: -9999, y: -9999, active: false };

  function particleCount(): number {
    return window.innerWidth < 768 ? 40 : 80;
  }

  function resize() {
    const rect = canvas!.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas!.width = Math.floor(width * dpr);
    canvas!.height = Math.floor(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    const count = particleCount();
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 1,
    }));
  }

  function step() {
    ctx!.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // mouse proximity boost
      let opacity = baseOpacity;
      let radius = p.r;
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS) {
          const t = 1 - dist / MOUSE_RADIUS;
          opacity = baseOpacity + t * 0.5;
          radius = p.r + t * 1.2;
        }
      }

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${accent}, ${opacity})`;
      ctx!.fill();
    }

    // links
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DISTANCE) {
          const o = (1 - dist / LINK_DISTANCE) * linkOpacity;
          ctx!.strokeStyle = `rgba(${accent}, ${o})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(step);
  }

  function onMouseMove(e: MouseEvent) {
    if (mouseRafQueued) return;
    mouseRafQueued = true;
    requestAnimationFrame(() => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      mouseRafQueued = false;
    });
  }

  function onMouseLeave() {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }

  // init
  resize();
  seed();

  const ro = new ResizeObserver(() => {
    resize();
    seed();
  });
  ro.observe(canvas);

  function onThemeChange() {
    applyTheme();
    // With the loop paused (reduced motion) we must repaint the static frame.
    if (prefersReduced) {
      step();
      cancelAnimationFrame(rafId);
    }
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseout', onMouseLeave);
  document.addEventListener('theme:change', onThemeChange);

  if (prefersReduced) {
    // draw a single static frame, no animation loop
    step();
    cancelAnimationFrame(rafId);
  } else {
    step();
  }

  return function cleanup() {
    cancelAnimationFrame(rafId);
    ro.disconnect();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseout', onMouseLeave);
    document.removeEventListener('theme:change', onThemeChange);
  };
}
