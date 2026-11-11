// The assistant's conversation as saved in sessionStorage, so it survives a reload and a
// switch between /en/ and /es/ in the same tab. Storage is outside the script's control (an
// extension or another script on the origin can write it), so it is validated on the way in.

import { MAX_ASSISTANT_CHARS, MAX_MESSAGES, MAX_USER_CHARS, type ChatTurn } from './validate';

/** The sessionStorage key that holds the conversation. */
export const SAVED_CHAT_KEY = 'chat';

/** Most rendered messages kept: each turn can add a question, an answer and a navigation note. */
export const MAX_TRANSCRIPT = MAX_MESSAGES * 2;

/** A message as rendered in the panel. Errors are never saved: they belong to one page view. */
export interface TranscriptLine {
  kind: 'user' | 'bot' | 'nav';
  content: string;
}

/** What the panel restores: the turns sent to the server, what it showed, and whether it was open. */
export interface SavedChat {
  history: ChatTurn[];
  transcript: TranscriptLine[];
  open: boolean;
}

const KINDS = new Set(['user', 'bot', 'nav']);

/** Returns the trimmed text when it is a non-empty string within `limit`, else null. */
function text(value: unknown, limit: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= limit ? trimmed : null;
}

/** Returns the entries of `value` as records, or an empty list when it is not an array. */
function records(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null);
}

/**
 * Reads a saved conversation, keeping only entries that the panel could have written.
 *
 * Turns follow the same rules as `parseChatRequest` (roles, lengths), so a tampered entry
 * is dropped here instead of making the next request fail. Only the latest `MAX_MESSAGES`
 * turns and `MAX_TRANSCRIPT` messages are kept.
 *
 * @param raw - The stored string, or null when nothing was saved.
 * @return The conversation to restore; empty when `raw` is missing or malformed.
 */
export function parseSavedChat(raw: string | null): SavedChat {
  let data: unknown;
  try {
    data = JSON.parse(raw ?? '');
  } catch {
    data = null;
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return { history: [], transcript: [], open: false };
  }
  const saved = data as Record<string, unknown>;

  const history: ChatTurn[] = [];
  for (const { role, content } of records(saved.history)) {
    if (role !== 'user' && role !== 'assistant') continue;
    const value = text(content, role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS);
    if (value) history.push({ role, content: value });
  }

  const transcript: TranscriptLine[] = [];
  for (const { kind, content } of records(saved.transcript)) {
    if (typeof kind !== 'string' || !KINDS.has(kind)) continue;
    const value = text(content, MAX_ASSISTANT_CHARS);
    if (value) transcript.push({ kind: kind as TranscriptLine['kind'], content: value });
  }

  return {
    history: history.slice(-MAX_MESSAGES),
    transcript: transcript.slice(-MAX_TRANSCRIPT),
    open: saved.open === true,
  };
}
