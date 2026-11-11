import { SECTIONS, type SectionId } from '../../i18n';

/** An event the chat endpoint sends to the browser. */
export type ChatEvent =
  | { type: 'text'; delta: string }
  | { type: 'nav'; section: SectionId }
  | { type: 'done' };

/** Name of the only tool the model may call. */
export const NAV_TOOL = 'show_section';

/** Incremental parser for an OpenAI chat completions stream. */
export interface CompletionParser {
  /**
   * Consumes one decoded chunk of the upstream response.
   *
   * @param chunk - Text as it arrived, possibly ending mid-line.
   * @return The text events completed by this chunk.
   */
  feed(chunk: string): ChatEvent[];

  /**
   * Ends the stream.
   *
   * @return The navigation event, when the model asked for a valid section, then `done`.
   */
  finish(): ChatEvent[];
}

/**
 * Creates a parser that turns the upstream stream into the site's own events.
 *
 * The browser never sees the upstream payload: only text deltas and a section id checked
 * against `SECTIONS` cross this boundary, so nothing the model emits can make the page
 * navigate anywhere else.
 *
 * @return A parser holding the state of one response.
 */
export function createCompletionParser(): CompletionParser {
  let buffer = '';
  let toolName = '';
  let toolArgs = '';

  function readLine(line: string, events: ChatEvent[]): void {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) return;
    const payload = trimmed.slice(5).trim();
    if (payload === '' || payload === '[DONE]') return;

    let delta: unknown;
    try {
      delta = JSON.parse(payload)?.choices?.[0]?.delta;
    } catch {
      return;
    }
    if (typeof delta !== 'object' || delta === null) return;
    const { content, tool_calls: toolCalls } = delta as Record<string, unknown>;

    if (typeof content === 'string' && content !== '') {
      events.push({ type: 'text', delta: content });
    }

    // Only the first tool call counts: one answer moves the page at most once.
    if (Array.isArray(toolCalls)) {
      for (const call of toolCalls) {
        if ((call?.index ?? 0) !== 0) continue;
        if (typeof call?.function?.name === 'string') toolName += call.function.name;
        if (typeof call?.function?.arguments === 'string') toolArgs += call.function.arguments;
      }
    }
  }

  return {
    feed(chunk) {
      const events: ChatEvent[] = [];
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) readLine(line, events);
      return events;
    },

    finish() {
      const events: ChatEvent[] = [];
      if (buffer !== '') readLine(buffer, events);
      buffer = '';

      if (toolName === NAV_TOOL) {
        try {
          const section = JSON.parse(toolArgs)?.section;
          if ((SECTIONS as readonly string[]).includes(section)) {
            events.push({ type: 'nav', section });
          }
        } catch {
          // Malformed arguments: answer without navigating.
        }
      }
      events.push({ type: 'done' });
      return events;
    },
  };
}

/**
 * Serialises an event as one server-sent event frame.
 *
 * @param event - The event to send.
 * @return The frame, ready to be written to the response.
 */
export function encodeEvent(event: ChatEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}
