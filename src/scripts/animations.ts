// src/scripts/animations.ts
// All GSAP / ScrollTrigger animation setup.
// Called on first load and re-called after every Astro View Transition.
// Spec: STACK.md §4.1, DESIGN.md §7

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let navScrollTrigger: ScrollTrigger | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initAnimations(): void {
  if (prefersReducedMotion()) {
    // Make sure nothing is left hidden when motion is disabled.
    gsap.set('.hero-word, .reveal, .project-card, .timeline-entry', {
      clearProps: 'all',
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'none',
    });
    return;
  }

  // Hero word stagger reveal on load.
  // Motion contract from the `animate-text` skill → effect "soft-blur-in"
  // (Apple-style hero reveal): per-token fade + slight rise + gentle blur,
  // easing cubic-bezier(0.22,1,0.36,1) ≈ expo.out, ~900ms, ~25ms stagger.
  // Applied per-word (the skill's recommended fallback for longer strings).
  const heroWords = gsap.utils.toArray<HTMLElement>('.hero-word');
  if (heroWords.length) {
    gsap.from(heroWords, {
      opacity: 0,
      y: 16,
      filter: 'blur(12px)',
      stagger: 0.05,
      duration: 0.9,
      ease: 'expo.out',
      delay: 0.15,
      force3D: true,
    });
  }

  // Generic section / element reveals
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: 0.7,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Project card grid stagger
  const cards = gsap.utils.toArray<HTMLElement>('.project-card');
  if (cards.length) {
    gsap.from(cards, {
      opacity: 0,
      y: 48,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        once: true,
      },
    });
  }

  // Subtle parallax: the artwork inside each project card drifts vertically as
  // the card travels through the viewport, adding depth without moving the card.
  gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
    const mark = card.querySelector<HTMLElement>('.card-visual-mark');
    if (!mark) return;
    gsap.fromTo(
      mark,
      { yPercent: -14 },
      {
        yPercent: 14,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      }
    );
  });

  // Timeline entries slide in from left
  gsap.utils.toArray<HTMLElement>('.timeline-entry').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: -32,
      duration: 0.6,
      ease: 'power2.out',
      force3D: true,
      delay: i * 0.05,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Nav background deepens on scroll
  const nav = document.querySelector('#main-nav');
  if (nav) {
    navScrollTrigger = ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        if (self.scroll() > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      },
    });
    // set initial state
    if (window.scrollY > 40) nav.classList.add('scrolled');
  }

  ScrollTrigger.refresh();
}

export function killAllAnimations(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  if (navScrollTrigger) {
    navScrollTrigger.kill();
    navScrollTrigger = null;
  }
  gsap.globalTimeline.clear();
}
