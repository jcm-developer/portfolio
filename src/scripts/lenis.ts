// src/scripts/lenis.ts
// Lenis smooth scroll, synced with the GSAP ticker + ScrollTrigger.
// Spec: STACK.md §4.2

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface LenisHandle {
  lenis: Lenis;
  destroy: () => void;
}

let tickerFn: ((time: number) => void) | null = null;
let scrollHandler: (() => void) | null = null;

export function initLenis(): LenisHandle {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReduced,
  });

  // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
  scrollHandler = () => ScrollTrigger.update();
  lenis.on('scroll', scrollHandler);

  tickerFn = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  // Expose for in-page anchor smooth-scrolling (Nav).
  (window as any).__lenis = lenis;

  function destroy() {
    if (scrollHandler) lenis.off('scroll', scrollHandler);
    if (tickerFn) gsap.ticker.remove(tickerFn);
    tickerFn = null;
    scrollHandler = null;
    if ((window as any).__lenis === lenis) (window as any).__lenis = undefined;
    lenis.destroy();
  }

  return { lenis, destroy };
}
