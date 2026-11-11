import type { APIRoute } from 'astro';

import { buildLlmsTxt } from '../lib/llms';

/**
 * Serves `/llms.txt`, a Markdown summary of the profile for AI assistants. Prerendered at
 * build time from the English dictionary, so it ships as a static file: its `charset` comes
 * from `public/_headers`, not from this response.
 *
 * @return The file contents.
 */
export const GET: APIRoute = ({ site, url }) => new Response(buildLlmsTxt(site ?? url));
