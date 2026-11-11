// Client side of the assistant. It only ever talks to this site's /api/chat: the key,
// the system prompt and the model live on the server (src/pages/api/chat.ts).

import type { ChatEvent } from '../lib/chat/stream';
import { MAX_MESSAGES, MAX_USER_CHARS, type ChatTurn } from '../lib/chat/validate';

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

  function open(): void {
    panel!.hidden = false;
    launcher!.setAttribute('aria-expanded', 'true');
    input!.focus();
  }

  function close(): void {
    panel!.hidden = true;
    launcher!.setAttribute('aria-expanded', 'false');
    launcher!.focus();
  }

  function addMessage(kind: 'user' | 'bot' | 'error' | 'nav', content: string): HTMLElement {
    const message = document.createElement('p');
    message.className = `chat-msg chat-msg-${kind}`;
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
    addMessage('user', content);
    history.push({ role: 'user', content });
    const bubble = addMessage('bot', '');
    bubble.classList.add('chat-msg-pending');

    function fail(message: string | undefined): void {
      history.pop();
      bubble.className = 'chat-msg chat-msg-error';
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
      sendButton!.disabled = false;
    }
  }

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

  // The hero question box hands over to the panel.
  const heroForm = document.querySelector<HTMLFormElement>('[data-ask-form]');
  const heroInput = heroForm?.querySelector<HTMLInputElement>('input');
  heroForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = heroInput?.value ?? '';
    if (heroInput) heroInput.value = '';
    open();
    void ask(question);
  });
}

const root = document.querySelector<HTMLElement>('[data-chat]');
if (root) init(root);
