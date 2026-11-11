import { describe, expect, it } from 'vitest';
import { createCompletionParser, encodeEvent, NAV_TOOL } from './stream';

const frame = (delta: unknown) => `data: ${JSON.stringify({ choices: [{ delta }] })}\n\n`;
const toolFrame = (name: string | undefined, args: string, index = 0) =>
  frame({ tool_calls: [{ index, function: { name, arguments: args } }] });

describe('createCompletionParser', () => {
  it('emits one text event per content delta', () => {
    const parser = createCompletionParser();
    const events = parser.feed(frame({ content: 'Hola' }) + frame({ content: ' mundo' }));
    expect(events).toEqual([
      { type: 'text', delta: 'Hola' },
      { type: 'text', delta: ' mundo' },
    ]);
    expect(parser.finish()).toEqual([{ type: 'done' }]);
  });

  it('reassembles a frame split across chunks', () => {
    const parser = createCompletionParser();
    const whole = frame({ content: 'Hola' });
    expect(parser.feed(whole.slice(0, 20))).toEqual([]);
    expect(parser.feed(whole.slice(20))).toEqual([{ type: 'text', delta: 'Hola' }]);
  });

  it('ignores the terminator, comments and broken JSON', () => {
    const parser = createCompletionParser();
    expect(parser.feed(': ping\n\ndata: {broken\n\ndata: [DONE]\n\n')).toEqual([]);
  });

  it('emits a navigation event for a valid section sent in fragments', () => {
    const parser = createCompletionParser();
    parser.feed(toolFrame(NAV_TOOL, '{"sec') + toolFrame(undefined, 'tion":"projects"}'));
    expect(parser.finish()).toEqual([{ type: 'nav', section: 'projects' }, { type: 'done' }]);
  });

  it('does not navigate to a section that is not on the page', () => {
    const parser = createCompletionParser();
    parser.feed(toolFrame(NAV_TOOL, '{"section":"https://evil.example"}'));
    expect(parser.finish()).toEqual([{ type: 'done' }]);
  });

  it('does not navigate on an unknown tool', () => {
    const parser = createCompletionParser();
    parser.feed(toolFrame('delete_everything', '{"section":"projects"}'));
    expect(parser.finish()).toEqual([{ type: 'done' }]);
  });

  it('does not navigate on malformed arguments', () => {
    const parser = createCompletionParser();
    parser.feed(toolFrame(NAV_TOOL, '{"section":'));
    expect(parser.finish()).toEqual([{ type: 'done' }]);
  });

  it('ignores every tool call after the first', () => {
    const parser = createCompletionParser();
    parser.feed(
      toolFrame(NAV_TOOL, '{"section":"skills"}') + toolFrame(NAV_TOOL, '{"section":"contact"}', 1),
    );
    expect(parser.finish()).toEqual([{ type: 'nav', section: 'skills' }, { type: 'done' }]);
  });
});

describe('encodeEvent', () => {
  it('writes one server-sent event frame', () => {
    expect(encodeEvent({ type: 'text', delta: 'a\nb' })).toBe(
      'data: {"type":"text","delta":"a\\nb"}\n\n',
    );
  });
});
