// Client side of the assistant. It only ever talks to this site's /api/chat: the key,
// the system prompt and the model live on the server (src/pages/api/chat.ts).

import { parseSavedChat, SAVED_CHAT_KEY, type SavedChat, type TranscriptLine } from '../lib/chat/session';
import type { ChatEvent } from '../lib/chat/stream';
import { MAX_MESSAGES, MAX_USER_CHARS, type ChatTurn } from '../lib/chat/validate';

/** Reads the saved conversation; storage can be missing or blocked, which means nothing saved. */
function load(): SavedChat {
  try {
    return parseSavedChat(sessionStorage.getItem(SAVED_CHAT_KEY));
  } catch {
    return parseSavedChat(null);
  }
}

function init(root: HTMLElement): void {
  const panel = root.querySelector<HTMLElement>('#chat-panel');
  const launcher = root.querySelector<HTMLButtonElement>('[data-chat-open]');
  const closer = root.querySelector<HTMLButtonElement>('[data-chat-close]');
  const log = root.querySelector<HTMLElement>('[data-chat-log]');
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]');
  const input = form?.querySelector<HTMLInputElement>('input');
  const sendButton = form?.querySelector<HTMLButtonElement>('button');
  if (!panel || !launcher || !closer || !log || !form || !input || !sendButton) return;

  const text = root.dataset;
  const history: ChatTurn[] = [];
  let busy = false;

  /** Saves the conversation for this tab, so a reload or a language switch keeps it. */
  function save(): void {
    // Only messages this script added carry data-kind; the greeting and errors are not kept.
    const transcript = [...log!.querySelectorAll<HTMLElement>('[data-kind]')]
      .map((message) => ({ kind: message.dataset.kind, content: message.textContent ?? '' }))
      .filter((line): line is TranscriptLine => line.kind !== 'error' && line.content !== '');
    const saved: SavedChat = { history, transcript, open: !panel!.hidden };
    try {
      sessionStorage.setItem(SAVED_CHAT_KEY, JSON.stringify(saved));
    } catch {
      // Storage full or blocked: the conversation still works, it just will not survive a reload.
    }
  }

  function show(focus: boolean): void {
    panel!.hidden = false;
    launcher!.setAttribute('aria-expanded', 'true');
    if (focus) input!.focus();
  }

  function open(): void {
    show(true);
    save();
  }

  function close(): void {
    panel!.hidden = true;
    launcher!.setAttribute('aria-expanded', 'false');
    launcher!.focus();
    save();
  }

  function addMessage(kind: 'user' | 'bot' | 'error' | 'nav', content: string): HTMLElement {
    const message = document.createElement('p');
    message.className = `chat-msg chat-msg-${kind}`;
    message.dataset.kind = kind;
    // Always textContent: nothing the model or the visitor writes is parsed as HTML.
    message.textContent = content;
    log!.appendChild(message);
    log!.scrollTop = log!.scrollHeight;
    return message;
  }

  function showSection(section: string): void {
    const target = document.getElementById(section);
    if (!target) return;
    const label = document.querySelector(`[data-nav-section="${section}"]`)?.textContent?.trim();
    addMessage('nav', `→ ${text.goingTo}: ${label ?? section}`);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    target.classList.add('is-pointed');
    window.setTimeout(() => target.classList.remove('is-pointed'), 4000);
  }

  /** Reads the event stream, filling `bubble` as text arrives. Returns the full answer. */
  async function readAnswer(body: ReadableStream<Uint8Array>, bubble: HTMLElement): Promise<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let answer = '';
    let section: string | undefined;

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split('\n\n');
      buffer = frames.pop() ?? '';

      for (const frame of frames) {
        if (!frame.startsWith('data:')) continue;
        let event: ChatEvent;
        try {
          event = JSON.parse(frame.slice(5));
        } catch {
          continue;
        }
        if (event.type === 'text') {
          answer += event.delta;
          bubble.classList.remove('chat-msg-pending');
          bubble.textContent = answer;
          log!.scrollTop = log!.scrollHeight;
        } else if (event.type === 'nav') {
          section = event.section;
        }
      }
    }

    if (section) {
      if (!answer) {
        answer = text.wentThere ?? '';
        bubble.textContent = answer;
      }
      showSection(section);
    }
    return answer;
  }

  async function ask(question: string): Promise<void> {
    const content = question.trim().slice(0, MAX_USER_CHARS);
    if (!content || busy) return;

    busy = true;
    sendButton!.disabled = true;
    const asked = addMessage('user', content);
    history.push({ role: 'user', content });
    const bubble = addMessage('bot', '');
    bubble.classList.add('chat-msg-pending');

    function fail(message: string | undefined): void {
      history.pop();
      // The failed question leaves the history, so it is not saved either.
      delete asked.dataset.kind;
      bubble.className = 'chat-msg chat-msg-error';
      bubble.dataset.kind = 'error';
      bubble.textContent = message ?? '';
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The server rejects longer conversations, so only the latest turns are sent.
        body: JSON.stringify({ lang: text.lang, messages: history.slice(-MAX_MESSAGES) }),
      });

      if (!response.ok || !response.body) {
        fail(response.status === 429 ? text.errorBusy : text.errorGeneric);
        return;
      }

      const answer = await readAnswer(response.body, bubble);
      if (answer) history.push({ role: 'assistant', content: answer });
      else fail(text.errorGeneric);
    } catch {
      fail(navigator.onLine ? text.errorGeneric : text.errorOffline);
    } finally {
      bubble.classList.remove('chat-msg-pending');
      busy = false;
      save();
      sendButton!.disabled = false;
    }
  }

  // Restore the tab's earlier conversation. Saved text is rendered with textContent like any
  // other message, and parseSavedChat has already dropped anything the panel could not write.
  const saved = load();
  history.push(...saved.history);
  saved.transcript.forEach((line) => addMessage(line.kind, line.content));
  // Reopen without focusing the input, so a phone does not raise its keyboard on load.
  if (saved.open) show(false);

  launcher.addEventListener('click', open);
  closer.addEventListener('click', close);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) close();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value;
    input.value = '';
    void ask(question);
  });

  // Buttons elsewhere on the page, such as the hero's, open the panel too.
  document.querySelectorAll<HTMLElement>('[data-chat-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', open);
  });
}

const root = document.querySelector<HTMLElement>('[data-chat]');
if (root) init(root);
