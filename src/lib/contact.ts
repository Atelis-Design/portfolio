/**
 * Contact form contract, shared by the browser (ContactForm.astro) and the
 * server endpoint (functions/api/contact.ts), so both apply the same rules.
 *
 * Pure TypeScript with no Astro or asset imports: the Cloudflare Pages
 * Function bundles this module directly.
 */
import { isLocale, type Locale } from '../i18n/locales';

/** Same-origin Cloudflare Pages Function (functions/api/contact.ts). */
export const CONTACT_ENDPOINT = '/api/contact';

/** Stable internal identifiers. Display labels are localized in ui.ts (contactForm.projectTypes). */
export const PROJECT_TYPES = [
  'residential',
  'commercial',
  'interior-architecture',
  'renovation',
  'consultation',
  'other',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

/** The four visible fields, in form order. */
export const CONTACT_FIELDS = ['name', 'email', 'projectType', 'message'] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

/** Character limits (UTF-16 code units, like the HTML maxlength/minlength attributes). */
export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  messageMin: 10,
  messageMax: 5000,
} as const;

/**
 * Honeypot: a text field hidden from people (off-screen, aria-hidden, not
 * focusable). Naive bots fill every field; any value marks the request as spam.
 */
export const HONEYPOT_FIELD = 'subject';

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: ProjectType;
  message: string;
  /** Locale of the page the form was sent from; decides the visitor confirmation language. */
  locale: Locale;
}

export type ContactValidation =
  | { ok: true; data: ContactSubmission }
  | { ok: false; invalid: (ContactField | 'locale')[] };

const text = (value: unknown): string => (typeof value === 'string' ? value.normalize('NFC') : '');

/** One line: bidi overrides removed; any run of whitespace or control characters becomes one space. */
export function normalizeName(value: unknown): string {
  return text(value)
    .replace(/[‪-‮⁦-⁩]/g, '')
    .replace(/[\s\u0000-\u001F\u007F]+/g, ' ')
    .trim();
}

export function normalizeEmail(value: unknown): string {
  return text(value).trim();
}

/** Multi-line: line breaks become \n; other control characters (except tab) are removed. */
export function normalizeMessage(value: unknown): string {
  return text(value)
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
    .trim();
}

/**
 * Pragmatic address check: exactly one "@", no whitespace, control characters or
 * characters that could split an address list (, ; < > " …), and a dotted domain.
 * Internationalized (Unicode) addresses are accepted.
 */
const EMAIL_PATTERN =
  /^[^\s@<>()[\]\\,;:"\u0000-\u001F\u007F]+@(?:[^\s@<>()[\]\\,;:".\u0000-\u001F\u007F]+\.)+[^\s@<>()[\]\\,;:".\u0000-\u001F\u007F]{2,}$/;

export function isValidEmail(email: string): boolean {
  return email.length <= CONTACT_LIMITS.email && email.indexOf('@') <= 64 && EMAIL_PATTERN.test(email);
}

export function isProjectType(value: unknown): value is ProjectType {
  return typeof value === 'string' && (PROJECT_TYPES as readonly string[]).includes(value);
}

/** Normalize and validate raw input (form values or a parsed request body). Never trust the client. */
export function validateContact(input: Record<string, unknown>): ContactValidation {
  const name = normalizeName(input.name);
  const email = normalizeEmail(input.email);
  const message = normalizeMessage(input.message);
  const projectType = isProjectType(input.projectType) ? input.projectType : null;
  const locale = isLocale(input.locale) ? input.locale : null;

  const invalid: (ContactField | 'locale')[] = [];
  if (!name || name.length > CONTACT_LIMITS.name) invalid.push('name');
  if (!isValidEmail(email)) invalid.push('email');
  if (!projectType) invalid.push('projectType');
  if (message.length < CONTACT_LIMITS.messageMin || message.length > CONTACT_LIMITS.messageMax) invalid.push('message');
  if (!locale) invalid.push('locale');

  if (invalid.length > 0 || !projectType || !locale) return { ok: false, invalid };
  return { ok: true, data: { name, email, projectType, message, locale } };
}
