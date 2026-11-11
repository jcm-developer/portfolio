// Draws the hero ribbon: a band of fine parallel lines that twists as it crosses the page,
// after the one on the LinkedIn banner. It draws itself in from the left on load, then drifts
// very slowly on its own; it never reacts to the pointer. Pure canvas, no dependencies.

const LINES = 48;
const STEP = 8;
const INTRO_MS = 2200;

function start(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Same breakpoint as Hero.astro: on phones the canvas is a band under the copy, not behind it.
  const band = window.matchMedia('(max-width: 44rem)');
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = true;
  let born = 0;

  function resize(): void {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw(performance.now());
  }

  function draw(now: number): void {
    const still = reduceMotion.matches;
    const t = still ? 0 : now / 1000;
    if (!born) born = now;
    // Share of the band drawn so far, eased out so it slows as it reaches the right edge.
    const intro = still ? 1 : 1 - Math.pow(1 - Math.min(1, (now - born) / INTRO_MS), 3);

    ctx!.clearRect(0, 0, width, height);
    if (!width || !height) return;

    const stroke = ctx!.createLinearGradient(0, 0, width, 0);
    // Faint on the left, where the copy sits, and full on the right, where the band has room.
    // On phones nothing sits over it, so it only fades a little at the left edge.
    const solo = band.matches;
    stroke.addColorStop(0, solo ? 'rgba(85, 72, 224, 0.16)' : 'rgba(85, 72, 224, 0.04)');
    stroke.addColorStop(0.4, solo ? 'rgba(85, 72, 224, 0.3)' : 'rgba(85, 72, 224, 0.1)');
    stroke.addColorStop(0.7, 'rgba(85, 72, 224, 0.38)');
    stroke.addColorStop(1, 'rgba(116, 132, 240, 0.32)');
    ctx!.strokeStyle = stroke;
    ctx!.lineWidth = 0.7;

    const end = (width + STEP) * intro;
    for (let i = 0; i < LINES; i++) {
      // Position of this line across the band, from -1 to 1.
      const s = (i / (LINES - 1)) * 2 - 1;
      ctx!.beginPath();
      for (let x = -STEP; x <= end; x += STEP) {
        const u = x / width;
        // The band enters high on the left, dips, and leaves high on the right.
        const centre = height * (0.22 + 0.5 * Math.sin(Math.PI * (u * 0.9 + 0.08)));
        // Its half-width changes sign along the way, which is what reads as a twist.
        const half = height * 0.2 * Math.cos(Math.PI * 2 * u * 0.85 + 0.5 + t * 0.14);
        const ripple = height * 0.02 * s * s * Math.sin(u * 5 + t * 0.35);
        const y = centre + s * half + ripple;
        if (x === -STEP) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.stroke();
    }
  }

  function loop(now: number): void {
    draw(now);
    frame = requestAnimationFrame(loop);
  }

  function sync(): void {
    cancelAnimationFrame(frame);
    if (visible && !reduceMotion.matches && !document.hidden) frame = requestAnimationFrame(loop);
    else draw(performance.now());
  }

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(canvas);
  document.addEventListener('visibilitychange', sync);
  reduceMotion.addEventListener('change', sync);

  resize();
  sync();
}

const canvas = document.querySelector<HTMLCanvasElement>('[data-ribbon]');
if (canvas) start(canvas);
