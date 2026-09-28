/**
 * SERVER-ONLY — used by the contact endpoint (functions/api/contact.ts), never by pages.
 *
 * Two emails per accepted submission, sent through Resend's REST API
 * (https://resend.com/docs/api-reference/emails/send-email):
 *   1. business notification → CONTACT_TO_EMAIL, Cc CONTACT_CC_EMAIL, Reply-To: the visitor
 *   2. confirmation → visitor, in the submitted locale, Reply-To: CONTACT_REPLY_EMAIL
 *
 * The From address is always the verified sender (CONTACT_FROM_EMAIL); the
 * visitor's address is never used as From. Every visitor-supplied value is
 * HTML-escaped before it is placed in an email body.
 */
import { SITE } from '../data/site';
import type { Locale } from '../i18n/locales';
import { format, useUi } from '../i18n/ui';
import type { ContactSubmission } from '../lib/contact';

/** Non-secret routing, used when the matching environment variable is not set. */
export const CONTACT_EMAIL_DEFAULTS = {
  /** CONTACT_TO_EMAIL: business inbox, receives every request. */
  to: 'atelisdesign.studio@gmail.com',
  /** CONTACT_CC_EMAIL: copied on every business notification. */
  cc: 'baturberrak002@gmail.com',
  /** CONTACT_REPLY_EMAIL: where a visitor's reply to the confirmation goes. */
  replyTo: 'atelisdesign.studio@gmail.com',
} as const;

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const PROVIDER_TIMEOUT_MS = 8000;

/** Environment variables (Cloudflare Pages settings, or .dev.vars locally). */
export interface ContactEmailEnv {
  RESEND_API_KEY?: string;
  /** Verified sender, e.g. `Atelis Design <contact@atelisdesign.com>`. */
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_CC_EMAIL?: string;
  CONTACT_REPLY_EMAIL?: string;
}

export interface EmailConfig {
  apiKey: string;
  from: string;
  to: string;
  /** null when it would duplicate `to`. */
  cc: string | null;
  replyTo: string;
}

/** null when the provider is not configured — the endpoint then reports an error, never success. */
export function readEmailConfig(env: ContactEmailEnv): EmailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !from) return null;
  const to = env.CONTACT_TO_EMAIL?.trim() || CONTACT_EMAIL_DEFAULTS.to;
  const cc = env.CONTACT_CC_EMAIL?.trim() || CONTACT_EMAIL_DEFAULTS.cc;
  const replyTo = env.CONTACT_REPLY_EMAIL?.trim() || CONTACT_EMAIL_DEFAULTS.replyTo;
  return { apiKey, from, to, cc: cc.toLowerCase() === to.toLowerCase() ? null : cc, replyTo };
}

interface Email {
  subject: string;
  html: string;
  text: string;
}

interface OutgoingEmail extends Email {
  from: string;
  to: string;
  cc?: string | null;
  replyTo: string;
}

/** Resend accepted the email (2xx). Failures are logged without the API key. */
async function send(apiKey: string, email: OutgoingEmail, kind: string): Promise<boolean> {
  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: email.from,
        to: [email.to],
        ...(email.cc ? { cc: [email.cc] } : {}),
        reply_to: email.replyTo,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
      signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
    });
    if (response.ok) return true;
    const detail = await response.text().catch(() => '');
    console.error(`Contact ${kind}: Resend responded ${response.status} ${detail.slice(0, 300)}`);
  } catch (error) {
    console.error(`Contact ${kind}: Resend request failed`, error instanceof Error ? error.message : error);
  }
  return false;
}

/**
 * Business notification: one email to the studio inbox with the stakeholder in Cc.
 * Its acceptance by the provider is what makes a submission successful.
 */
export function sendNotification(data: ContactSubmission, config: EmailConfig, submittedAt: Date): Promise<boolean> {
  const email = notificationEmail(data, submittedAt);
  return send(
    config.apiKey,
    { ...email, from: config.from, to: config.to, cc: config.cc, replyTo: data.email },
    'notification',
  );
}

/** Visitor confirmation. Replies go to the public studio inbox (CONTACT_REPLY_EMAIL). */
export function sendConfirmation(data: ContactSubmission, config: EmailConfig): Promise<boolean> {
  const email = confirmationEmail(data);
  return send(config.apiKey, { ...email, from: config.from, to: data.email, replyTo: config.replyTo }, 'confirmation');
}

/* ------------------------------------------------------------------ templates */

const COLOR = { text: '#271c14', secondary: '#4b3528', muted: '#6b574d', rule: '#dacec4' };
const FONT = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";

/** Language names for the (English) studio notification. */
const LANGUAGE_NAMES: Record<Locale, string> = {
  tr: 'Turkish',
  en: 'English',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  ru: 'Russian',
};

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

/** Escaped, with line breaks kept. */
const multiline = (value: string) => escapeHtml(value).replace(/\n/g, '<br>');

/** 2026-09-28 14:05 UTC */
const formatTimestamp = (date: Date) => `${date.toISOString().slice(0, 16).replace('T', ' ')} UTC`;

function layout(locale: Locale, title: string, body: string): string {
  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
<tr><td style="font-family:${FONT};color:${COLOR.text};font-size:17px;line-height:1.6;">
<p style="margin:0 0 14px;font-size:14px;letter-spacing:0.24em;color:${COLOR.text};">${escapeHtml(SITE.brand.toUpperCase())}</p>
<div style="height:1px;line-height:1px;font-size:1px;background:${COLOR.rule};margin:0 0 28px;">&nbsp;</div>
${body}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function notificationEmail(data: ContactSubmission, submittedAt: Date): Email {
  const projectType = useUi('en').contactForm.projectTypes[data.projectType];
  const language = `${LANGUAGE_NAMES[data.locale]} (${data.locale})`;
  const submitted = formatTimestamp(submittedAt);
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Project Type', projectType],
    ['Language', language],
    ['Submitted', submitted],
  ];

  const text = [
    'New Atelis Design contact request',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    data.message,
    '',
    '—',
    'Reply to this email to answer the visitor directly.',
  ].join('\n');

  const cell = `padding:6px 0;vertical-align:top;font-family:${FONT};font-size:16px;`;
  const html = layout(
    'en',
    'New contact request',
    `<p style="margin:0 0 20px;font-size:24px;line-height:1.3;">New contact request</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0 0 24px;">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="${cell}width:130px;color:${COLOR.muted};">${label}</td><td style="${cell}color:${COLOR.text};">${escapeHtml(value)}</td></tr>`,
  )
  .join('\n')}
</table>
<p style="margin:0 0 8px;font-size:14px;letter-spacing:0.12em;color:${COLOR.muted};">MESSAGE</p>
<p style="margin:0 0 28px;color:${COLOR.text};">${multiline(data.message)}</p>
<p style="margin:0;font-size:14px;color:${COLOR.muted};">Reply to this email to answer the visitor directly.</p>`,
  );

  return { subject: `New contact request — ${data.name}`, html, text };
}

export function confirmationEmail(data: ContactSubmission): Email {
  const ui = useUi(data.locale);
  const { confirmation, success } = ui.contactForm;
  const greeting = format(confirmation.greeting, { name: data.name });
  const subject = `${confirmation.subject} — ${SITE.brand}`;

  const text = [SITE.brand.toUpperCase(), '', greeting, '', success, '', SITE.brand, ui.home.discipline].join('\n');

  const html = layout(
    data.locale,
    subject,
    `<p style="margin:0 0 18px;">${escapeHtml(greeting)}</p>
<p style="margin:0 0 32px;color:${COLOR.secondary};">${escapeHtml(success)}</p>
<p style="margin:0;">${escapeHtml(SITE.brand)}<br><span style="font-size:14px;letter-spacing:0.12em;color:${COLOR.muted};">${escapeHtml(ui.home.discipline)}</span></p>`,
  );

  return { subject, html, text };
}
