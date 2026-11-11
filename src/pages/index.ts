import type { APIRoute } from 'astro';
import { pickLocale } from '../i18n';

// Runs in the Worker: the target depends on the visitor's Accept-Language header.
export const prerender = false;

/**
 * Redirects the bare domain to the locale the visitor's browser prefers.
 *
 * @param context - The Astro API context.
 * @return A temporary redirect to `/en/` or `/es/`.
 */
export const GET: APIRoute = ({ request }) => {
  const locale = pickLocale(request.headers.get('accept-language'));
  return new Response(null, {
    status: 302,
    headers: {
      Location: `/${locale}/`,
      Vary: 'Accept-Language',
      'Cache-Control': 'no-store',
    },
  });
};
