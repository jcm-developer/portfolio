import { isLocale, type Locale } from '../../i18n';

/** Largest request body the chat endpoint accepts, in characters. */
export const MAX_BODY_CHARS = 16_000;

/** Most conversation turns accepted in one request. Older turns are the client's to drop. */
export const MAX_MESSAGES = 12;

/** Longest visitor message, in characters. */
export const MAX_USER_CHARS = 500;

/** Longest assistant message echoed back as history, in characters. */
export const MAX_ASSISTANT_CHARS = 2_000;

/** One turn of the conversation as the client sends it. */
export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/** A chat request that passed validation. */
export interface ChatRequest {
  lang: Locale;
  messages: ChatTurn[];
}

/** The outcome of validating a request body. */
export type ParseResult = { ok: true; value: ChatRequest } | { ok: false; error: 'invalid_request' };

const INVALID: ParseResult = { ok: false, error: 'invalid_request' };

/**
 * Validates the JSON body of a chat request.
 *
 * Only `user` and `assistant` roles are accepted, so a client can never inject a system
 * or tool message, and the last turn must come from the visitor. Unknown fields are
 * dropped instead of being forwarded upstream.
 *
 * @param body - The parsed JSON body, of unknown shape.
 * @return The cleaned request, or an error when any rule fails.
 */
export function parseChatRequest(body: unknown): ParseResult {
  if (typeof body !== 'object' || body === null) return INVALID;
  const { lang, messages } = body as Record<string, unknown>;

  if (!isLocale(lang)) return INVALID;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return INVALID;
  }

  const turns: ChatTurn[] = [];
  for (const message of messages) {
    if (typeof message !== 'object' || message === null) return INVALID;
    const { role, content } = message as Record<string, unknown>;
    if (role !== 'user' && role !== 'assistant') return INVALID;
    if (typeof content !== 'string') return INVALID;

    const text = content.trim();
    const limit = role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS;
    if (text.length === 0 || text.length > limit) return INVALID;
    turns.push({ role, content: text });
  }

  if (turns[turns.length - 1].role !== 'user') return INVALID;
  return { ok: true, value: { lang, messages: turns } };
}

/**
 * Checks that a request was sent by a page of this same site.
 *
 * Browsers always attach `Origin` to a cross-site POST and cannot forge it, so this stops
 * other websites from using the endpoint through their visitors. It does not stop a
 * script that sets the header by hand; the rate limit covers that case.
 *
 * @param request - The incoming request.
 * @return True when the Origin header matches the origin the request was sent to.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
