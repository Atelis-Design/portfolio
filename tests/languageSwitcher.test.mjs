/**
 * Language switcher regressions (src/components/LanguageSwitcher.astro).
 * Dependency-free: the iOS/WebKit tap failure is guarded at source level, since a
 * real browser is not part of `npm test`.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = readFileSync(new URL('../src/components/LanguageSwitcher.astro', import.meta.url), 'utf8');

test('focusout does not close the menu when focus moves nowhere (Safari link taps)', () => {
  const handler = source.match(/addEventListener\('focusout',[\s\S]*?\}\);/);
  assert.ok(handler, 'focusout handler present');
  // Safari blurs the summary with relatedTarget === null when a link is tapped;
  // the handler must require a real next element before closing.
  assert.match(handler[0], /instanceof Node/);
});

