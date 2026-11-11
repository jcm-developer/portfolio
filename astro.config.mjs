import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// SITE_URL is the canonical origin used by the sitemap and the canonical and
// hreflang tags. It defaults to the production workers.dev origin; set it as a build variable
// in the Cloudflare dashboard only when the site moves to another domain.
const SITE = process.env.SITE_URL || 'https://portfolio.jaumecortesmonzon.workers.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Pages are prerendered; only `/` and `/api/chat` opt out and run in the Worker.
  output: 'static',
  adapter: cloudflare({
    // Optimize images with sharp at build time: every page that uses one is prerendered.
    imageService: 'compile',
  }),
  // No sessions: without this the adapter adds a SESSION KV binding that deploy would provision.
  session: false,
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ],
  build: {
    // No inline <style> blocks, so the Content Security Policy can forbid inline styles.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // No inline <script> blocks either: every script ships as a same-origin file.
      assetsInlineLimit: 0,
    },
  },
});
