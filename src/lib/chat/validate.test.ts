import { describe, expect, it } from 'vitest';
import { isSameOrigin, MAX_MESSAGES, MAX_USER_CHARS, parseChatRequest } from './validate';

const user = (content: string) => ({ role: 'user', content });

describe('parseChatRequest', () => {
  it('accepts a conversation that ends with the visitor', () => {
    const result = parseChatRequest({
      lang: 'es',
      messages: [user('Hola'), { role: 'assistant', content: 'Hola.' }, user('  Stack?  ')],
    });
    expect(result).toEqual({
      ok: true,
      value: {
        lang: 'es',
        messages: [user('Hola'), { role: 'assistant', content: 'Hola.' }, user('Stack?')],
      },
    });
  });

  it('drops fields the endpoint does not know', () => {
    const result = parseChatRequest({
      lang: 'en',
      model: 'other-model',
      messages: [{ role: 'user', content: 'Hi', name: 'x', tool_calls: [] }],
    });
    expect(result).toEqual({ ok: true, value: { lang: 'en', messages: [user('Hi')] } });
  });

  it.each(['system', 'tool', 'developer', 'function'])('rejects the %s role', (role) => {
    const result = parseChatRequest({ lang: 'en', messages: [{ role, content: 'x' }, user('Hi')] });
    expect(result.ok).toBe(false);
  });

  it('rejects an unknown locale', () => {
    expect(parseChatRequest({ lang: 'fr', messages: [user('Salut')] }).ok).toBe(false);
  });

  it('rejects a conversation that ends with the assistant', () => {
    const result = parseChatRequest({
      lang: 'en',
      messages: [user('Hi'), { role: 'assistant', content: 'Hello.' }],
    });
    expect(result.ok).toBe(false);
  });

  it('rejects a visitor message over the length limit', () => {
    const result = parseChatRequest({ lang: 'en', messages: [user('a'.repeat(MAX_USER_CHARS + 1))] });
    expect(result.ok).toBe(false);
  });

  it('rejects more turns than the limit', () => {
    const messages = Array.from({ length: MAX_MESSAGES + 1 }, () => user('Hi'));
    expect(parseChatRequest({ lang: 'en', messages }).ok).toBe(false);
  });

  it('rejects a body that is not a chat request', () => {
    const bodies = [null, 'text', 42, [], {}, { lang: 'en' }, { lang: 'en', messages: [] }];
    for (const body of bodies) expect(parseChatRequest(body).ok).toBe(false);
  });

  it('rejects a malformed message', () => {
    const bad = [null, 'text', { role: 'user' }, { role: 'user', content: 7 }, user('   ')];
    for (const message of bad) {
      expect(parseChatRequest({ lang: 'en', messages: [message] }).ok).toBe(false);
    }
  });
});

describe('isSameOrigin', () => {
  const request = (origin?: string) =>
    new Request('https://site.example/api/chat', {
      method: 'POST',
      headers: origin === undefined ? {} : { origin },
    });

  it('accepts the origin the request was sent to', () => {
    expect(isSameOrigin(request('https://site.example'))).toBe(true);
  });

  it('rejects another site', () => {
    expect(isSameOrigin(request('https://evil.example'))).toBe(false);
  });

  it('rejects the same host over another scheme', () => {
    expect(isSameOrigin(request('http://site.example'))).toBe(false);
  });

  it('rejects a request without an Origin header', () => {
    expect(isSameOrigin(request())).toBe(false);
  });

  it('rejects an Origin header that is not a URL', () => {
    expect(isSameOrigin(request('null'))).toBe(false);
  });
});
