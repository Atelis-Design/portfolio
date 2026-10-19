/**
 * `fetch` that gives up after `ms` milliseconds.
 * Uses AbortController + a timer rather than `AbortSignal.timeout()`, which Safari
 * (and so every iOS browser) only supports from 16.0; calling it on older WebKit
 * throws before the request is ever sent.
 */
export async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
