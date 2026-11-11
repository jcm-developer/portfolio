# Chat

## Purpose

The assistant answers visitors' questions about Jaume from the same facts the page shows, and
scrolls the page to the section that covers the answer. It exists as a live sample of the work
the site describes. Its design goal is that the model key can only ever be spent on that.

## Key files

- `src/pages/api/chat.ts` (`POST`): the endpoint. The only code that reads `OPENAI_API_KEY`.
- `src/lib/chat/validate.ts` (`parseChatRequest`, `isSameOrigin`, the `MAX_*` limits): what a
  request must look like.
- `src/lib/chat/prompt.ts` (`buildSystemPrompt`): the system prompt, built from
  `src/i18n/en.ts` and `src/data/profile.ts`.
- `src/lib/chat/stream.ts` (`createCompletionParser`, `encodeEvent`, `NAV_TOOL`): turns the
  upstream stream into the site's own events.
- `src/components/Chat.astro`: launcher and panel markup and styles.
- `src/scripts/chat.ts`: panel behaviour in the browser.
- `src/lib/chat/session.ts` (`parseSavedChat`, `SAVED_CHAT_KEY`, `MAX_TRANSCRIPT`): the
  conversation as saved for the tab, and its validation on the way back in.
- `src/components/Hero.astro`: the button that opens the panel (`data-chat-trigger`).
- Tests: `src/lib/chat/validate.test.ts`, `src/lib/chat/stream.test.ts`,
  `src/lib/chat/session.test.ts`.

## Data

Nothing is stored on the server. The conversation lives in the visitor's tab (`history` in
`src/scripts/chat.ts`) and is sent whole with each question. After each turn, and when the
panel opens or closes, it is saved to `sessionStorage` under `SAVED_CHAT_KEY` as a
`SavedChat`: the turns (`history`), the rendered messages (`transcript`) and whether the panel
was open. On load the panel restores it, so the conversation survives a reload and a switch
between `/en/` and `/es/` in the same tab, and ends with the tab. The greeting, error messages
and a question that failed are never saved.

Request: `{ lang, messages: [{ role: 'user' | 'assistant', content }] }`.

Response: `text/event-stream` of `ChatEvent` frames: `text` (a delta), `nav` (a section id),
`done`. Errors are JSON `{ error }` with a stable code: `forbidden` (403), `invalid_request`
(400, 413, 415), `rate_limited` (429), `unavailable` (502, 503).

## Flow

1. The visitor opens the panel (the launcher, or any `[data-chat-trigger]` button such as the
   hero's) and submits the form; `ask` in
   `src/scripts/chat.ts` posts the last `MAX_MESSAGES` turns to `/api/chat`.
2. The endpoint checks, in order: same origin, JSON content type, body size, shape
   (`parseChatRequest`), rate limit (`CHAT_LIMITER`, keyed by `cf-connecting-ip`), key present.
3. It calls the model with the server-built system prompt, the validated turns, the
   `show_section` tool and `MAX_OUTPUT_TOKENS`.
4. The upstream stream is piped through `createCompletionParser`; only `ChatEvent` frames reach
   the browser.
5. The browser appends text to the answer bubble. On `nav` it scrolls to the section, marks it
   with `is-pointed` (a rule under the label, `src/components/Section.astro`) and leaves a
   note in the conversation.

## Invariants

- The key, the system prompt, the model and the tool list never leave the server, and the
  client cannot set any of them. `parseChatRequest` drops every field it does not know.
- Only `user` and `assistant` roles are accepted, and the last turn is the visitor's.
- A `nav` event carries a value from `SECTIONS` or is not sent. The page never navigates to
  anything the model wrote freely.
- Model output, visitor input and restored messages are rendered with `textContent`, never as
  HTML.
- What comes back from `sessionStorage` passes `parseSavedChat` first: unknown roles and
  kinds, empty or oversized entries are dropped, and only the latest turns are kept, so a
  tampered entry can neither inject a role nor make the next request fail.
- Upstream errors are logged on the server and replaced by a stable code for the client.

## Gotchas

- The endpoint is public. The origin check stops other websites from using it through their
  visitors' browsers; a script can forge the header, and the rate limit, the output cap and
  the provider budget are what bound that case. See `docs/operations.md`, Costs.
- The Cloudflare rate limiter counts per edge location and is approximate by design. Treat it
  as a brake, not as an exact quota.
- `MAX_MESSAGES` is enforced on both sides: the client trims, the server rejects. Change it in
  `src/lib/chat/validate.ts` only; the client imports it.
- When the model calls the tool without writing text, the browser shows the `wentThere` string
  so the turn is never empty.
- The prompt always states facts in English; the model translates. A fact missing from
  `src/i18n/en.ts` does not exist for the assistant, even if the Spanish page shows it.

## Related

- `docs/decisions.md`: D2 (why the endpoint exists), D4 (Content Security Policy), D5 (one tool).
- `docs/domains/content.md`: where the facts in the prompt come from.
- `docs/operations.md`: environment variables, rate limit binding, costs.
