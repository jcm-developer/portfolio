import type { APIRoute } from 'astro';
import { SECTIONS } from '../../i18n';
import { buildSystemPrompt } from '../../lib/chat/prompt';
import { createCompletionParser, encodeEvent, NAV_TOOL } from '../../lib/chat/stream';
import { isSameOrigin, MAX_BODY_CHARS, parseChatRequest } from '../../lib/chat/validate';

// Runs in the Worker on every request; the rest of the site is prerendered.
export const prerender = false;

/** Model used when `OPENAI_MODEL` is not set. */
const DEFAULT_MODEL = 'gpt-4o-mini';

/** Hard cap on the length of one answer, which also caps what one request can cost. */
const MAX_OUTPUT_TOKENS = 300;

/** How long to wait for the upstream response to start, in milliseconds. */
const UPSTREAM_TIMEOUT_MS = 20_000;

/** Endpoint used when `OPENAI_CHAT_URL` is not set. */
const DEFAULT_UPSTREAM_URL = 'https://api.openai.com/v1/chat/completions';

/** Stable error codes returned to the browser. Upstream detail never leaves the server. */
type ErrorCode = 'forbidden' | 'invalid_request' | 'rate_limited' | 'unavailable';

function errorResponse(status: number, error: ErrorCode): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/**
 * Answers one chat turn as a stream of server-sent events.
 *
 * This is the only place that holds the OpenAI key. The browser sends the visible
 * conversation and nothing else: the system prompt, model, tools and limits are fixed
 * here, so a visitor cannot use the key for anything but questions about the profile.
 *
 * @param context - The Astro API context.
 * @return A `text/event-stream` response, or a JSON error with a stable code.
 */
export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  if (!isSameOrigin(request)) return errorResponse(403, 'forbidden');

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return errorResponse(415, 'invalid_request');
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) return errorResponse(413, 'invalid_request');

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return errorResponse(400, 'invalid_request');
  }
  const parsed = parseChatRequest(body);
  if (!parsed.ok) return errorResponse(400, parsed.error);

  const env = locals.runtime?.env ?? {};

  if (env.CHAT_LIMITER) {
    const key = request.headers.get('cf-connecting-ip') ?? clientAddress ?? 'unknown';
    const { success } = await env.CHAT_LIMITER.limit({ key });
    if (!success) return errorResponse(429, 'rate_limited');
  }

  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('chat: OPENAI_API_KEY is not set');
    return errorResponse(503, 'unavailable');
  }

  let upstream: Response;
  try {
    upstream = await fetch(env.OPENAI_CHAT_URL || DEFAULT_UPSTREAM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      body: JSON.stringify({
        model: env.OPENAI_MODEL || DEFAULT_MODEL,
        stream: true,
        max_completion_tokens: MAX_OUTPUT_TOKENS,
        messages: [
          { role: 'system', content: buildSystemPrompt(parsed.value.lang) },
          ...parsed.value.messages,
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: NAV_TOOL,
              description: 'Scroll the page to the section that covers the topic of the question.',
              parameters: {
                type: 'object',
                properties: { section: { type: 'string', enum: SECTIONS } },
                required: ['section'],
                additionalProperties: false,
              },
            },
          },
        ],
      }),
    });
  } catch (error) {
    console.error('chat: upstream request failed', error);
    return errorResponse(502, 'unavailable');
  }

  if (!upstream.ok || !upstream.body) {
    console.error('chat: upstream answered', upstream.status, await upstream.text().catch(() => ''));
    return errorResponse(502, 'unavailable');
  }

  const parser = createCompletionParser();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const events = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        for (const event of parser.feed(decoder.decode(chunk, { stream: true }))) {
          controller.enqueue(encoder.encode(encodeEvent(event)));
        }
      },
      flush(controller) {
        for (const event of parser.finish()) {
          controller.enqueue(encoder.encode(encodeEvent(event)));
        }
      },
    }),
  );

  return new Response(events, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
