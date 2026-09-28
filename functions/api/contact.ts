/**
 * POST /api/contact — Cloudflare Pages Function behind the Contact form.
 * Only this route runs server-side; the rest of the site stays static.
 *
 *   request checks (method, origin, content type, size)
 *     → honeypot → validation (src/lib/contact.ts, same rules as the browser)
 *     → business notification: studio inbox, Cc stakeholder, Reply-To: visitor   (must succeed)
 *     → confirmation to the visitor in the submitted locale, Reply-To: studio  (after the response)
 *
 * JSON requests (the enhanced form) get JSON back. Plain form posts (browsers
 * without JavaScript) are redirected to the contact page, to #contact-sent or
 * #contact-failed. Secrets come from the environment — see README → Contact form.
 */
import { DEFAULT_LOCALE, isLocale } from '../../src/i18n/locales';
import { localizedPath } from '../../src/i18n/routes';
import { HONEYPOT_FIELD, validateContact } from '../../src/lib/contact';
import {
  readEmailConfig,
  sendConfirmation,
  sendNotification,
  type ContactEmailEnv,
} from '../../src/server/contact-email';

/** The subset of the Pages Functions context this endpoint uses. */
interface PagesContext {
  request: Request;
  env: ContactEmailEnv;
  waitUntil(promise: Promise<unknown>): void;
}

const JSON_TYPE = 'application/json';
const FORM_TYPE = 'application/x-www-form-urlencoded';

/** Room for a 5 000-character Cyrillic message, percent-encoded, plus the other fields. */
const MAX_BODY_BYTES = 64 * 1024;

interface Outcome {
  status: number;
  body: { ok: boolean; error?: string; fields?: string[] };
}

const fail = (status: number, error: string): Outcome => ({ status, body: { ok: false, error } });

function json({ status, body }: Outcome, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

/** No-JavaScript fallback: back to the contact page, where :target shows the result. */
function redirectBack(locale: unknown, ok: boolean): Response {
  const target = localizedPath(isLocale(locale) ? locale : DEFAULT_LOCALE, 'contact', ok ? 'contact-sent' : 'contact-failed');
  return new Response(null, { status: 303, headers: { Location: target, 'Cache-Control': 'no-store' } });
}

async function readBody(request: Request, type: string): Promise<Record<string, unknown> | 'too_large' | null> {
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY_BYTES) return 'too_large';
  const body = await request.text();
  if (body.length > MAX_BODY_BYTES) return 'too_large';
  if (type === FORM_TYPE) return Object.fromEntries(new URLSearchParams(body));
  try {
    const parsed: unknown = JSON.parse(body);
    return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

async function handle(input: Record<string, unknown>, context: PagesContext): Promise<Outcome> {
  // Bots only: the field cannot be seen, focused or reached by assistive technology.
  // Answer like a success so the bot learns nothing; nothing is sent.
  const trap = input[HONEYPOT_FIELD];
  if (typeof trap === 'string' && trap.trim() !== '') {
    console.warn('Contact: honeypot filled — submission discarded');
    return { status: 200, body: { ok: true } };
  }

  const result = validateContact(input);
  if (!result.ok) return { status: 400, body: { ok: false, error: 'invalid', fields: result.invalid } };

  const config = readEmailConfig(context.env);
  if (!config) {
    console.error('Contact: RESEND_API_KEY and/or CONTACT_FROM_EMAIL are not configured');
    return fail(503, 'not_configured');
  }

  const delivered = await sendNotification(result.data, config, new Date());
  if (!delivered) return fail(502, 'delivery_failed');

  // The studio has the message; the visitor's confirmation does not hold up the response.
  context.waitUntil(sendConfirmation(result.data, config));
  return { status: 200, body: { ok: true } };
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const { request } = context;

  if (request.method !== 'POST') return json(fail(405, 'method_not_allowed'), { Allow: 'POST' });

  const origin = request.headers.get('Origin');
  if (origin !== null && origin !== new URL(request.url).origin) return json(fail(403, 'forbidden'));

  const type = (request.headers.get('Content-Type') ?? '').split(';')[0].trim().toLowerCase();
  if (type !== JSON_TYPE && type !== FORM_TYPE) return json(fail(415, 'unsupported_media_type'));

  const input = await readBody(request, type);
  if (input === 'too_large') return json(fail(413, 'payload_too_large'));
  if (!input) return json(fail(400, 'bad_request'));

  const outcome = await handle(input, context);
  return type === FORM_TYPE ? redirectBack(input.locale, outcome.body.ok) : json(outcome);
}
