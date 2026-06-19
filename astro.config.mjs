import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Deploy targets are env-overridable so the same build works on a custom
// domain / user page (root) or a GitHub Pages project subpath.
//   SITE_URL  → full canonical origin (used by sitemap + canonical meta)
//   BASE_PATH → "/" for root, or "/<repo>" for a project page
const SITE = process.env.SITE_URL || 'https://jaumecortes.dev';
const BASE = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],
  output: 'static',
  image: {
    // Astro built-in image optimization
    format: ['avif', 'webp'],
  },
  vite: {
    plugins: [tailwindcss()],
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
