/**
 * Contact request timeout (src/lib/fetchWithTimeout.ts, src/components/ContactForm.astro).
 * Regression: on Safari / iOS < 16 `AbortSignal.timeout` does not exist, and calling it
 * threw before the request was sent, so the form always reported failure.
 * Dependency-free: `fetch` is mocked; nothing leaves the machine.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { afterEach, beforeEach, test } from 'node:test';
import { fetchWithTimeout } from '../src/lib/fetchWithTimeout.ts';

const realFetch = globalThis.fetch;
const realTimeout = AbortSignal.timeout;

beforeEach(() => {
  // Simulate pre-16 WebKit.
  delete AbortSignal.timeout;
});

afterEach(() => {
  globalThis.fetch = realFetch;
  AbortSignal.timeout = realTimeout;
});

test('sends the request and returns the response without AbortSignal.timeout', async () => {
  assert.equal(AbortSignal.timeout, undefined);
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };

  const body = JSON.stringify({ name: 'QA' });
  const response = await fetchWithTimeout('/api/contact', { method: 'POST', body }, 20000);

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, '/api/contact');
  assert.equal(calls[0].init.method, 'POST');
  assert.equal(calls[0].init.body, body);
  assert.ok(calls[0].init.signal instanceof AbortSignal);
  assert.deepEqual(await response.json(), { ok: true });
});

test('aborts a request that outlives the timeout', async () => {
  let signal;
  globalThis.fetch = (_url, init) =>
    new Promise((_resolve, reject) => {
      signal = init.signal;
      init.signal.addEventListener('abort', () => reject(init.signal.reason));
    });

  await assert.rejects(fetchWithTimeout('/api/contact', { method: 'POST' }, 20), { name: 'AbortError' });
  assert.equal(signal.aborted, true);
});

test('passes network errors through unchanged', async () => {
  globalThis.fetch = async () => {
    throw new TypeError('Failed to fetch');
  };
  await assert.rejects(fetchWithTimeout('/api/contact', {}, 20000), { name: 'TypeError', message: 'Failed to fetch' });
});

test('the contact form script no longer calls AbortSignal.timeout', () => {
  const source = readFileSync(new URL('../src/components/ContactForm.astro', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /AbortSignal\.timeout/);
  assert.match(source, /fetchWithTimeout\(/);
});
