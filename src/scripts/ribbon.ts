// Draws the hero ribbon: a band of fine parallel lines that twists as it crosses the
// page, after the one on the LinkedIn banner. Pure canvas, no dependencies.

const LINES = 44;
const STEP = 8;

function start(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = true;

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
    const t = reduceMotion.matches ? 0 : now / 1000;
    ctx!.clearRect(0, 0, width, height);

    const stroke = ctx!.createLinearGradient(0, 0, width, 0);
    stroke.addColorStop(0, 'rgba(85, 72, 224, 0)');
    stroke.addColorStop(0.45, 'rgba(85, 72, 224, 0.42)');
    stroke.addColorStop(1, 'rgba(116, 132, 240, 0.3)');
    ctx!.strokeStyle = stroke;
    ctx!.lineWidth = 0.7;

    for (let i = 0; i < LINES; i++) {
      // Position of this line across the band, from -1 to 1.
      const s = (i / (LINES - 1)) * 2 - 1;
      ctx!.beginPath();
      for (let x = -STEP; x <= width + STEP; x += STEP) {
        const u = x / width;
        // The band enters high on the left, dips, and leaves high on the right.
        const centre = height * (0.16 + 0.5 * Math.sin(Math.PI * (u * 0.9 + 0.08)));
        // Its half-width changes sign along the way, which is what reads as a twist.
        const half = height * 0.2 * Math.cos(Math.PI * 2 * u * 0.85 + 0.5 + t * 0.12);
        const ripple = 10 * s * s * Math.sin(u * 5 + t * 0.3);
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
