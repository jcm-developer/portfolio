import type { APIRoute } from 'astro';

import { buildLlmsTxt } from '../lib/llms';

/**
 * Serves `/llms.txt`, a Markdown summary of the profile for AI assistants. Prerendered at
 * build time from the English dictionary.
 *
 * @return The file as UTF-8 Markdown.
 */
export const GET: APIRoute = ({ site, url }) =>
  new Response(buildLlmsTxt(site ?? url), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
