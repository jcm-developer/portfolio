import type { APIRoute } from 'astro';

// Runs in the Worker so the redirect is a real HTTP response, not a meta refresh page.
export const prerender = false;

/**
 * Redirects the bare domain to the English page, the site's default language.
 *
 * @return A temporary redirect to `/en/`.
 */
export const GET: APIRoute = () =>
  new Response(null, {
    status: 302,
    headers: { Location: '/en/', 'Cache-Control': 'no-store' },
  });
