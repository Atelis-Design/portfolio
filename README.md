# Atelis Design — Portfolio

Public portfolio website for the interior architecture practice of Batur Berrak
(working brand: **Atelis Design**). Image-led, editorial, static.

Production domain: **https://atelisdesign.com**

> **Not yet configured:** CMS integration, deployment, domain cutover, and the
> contact form's email provider (see [Contact form](#contact-form)).
> This repository currently builds a local static site only.

## Stack

- [Astro](https://astro.build) 7 — static output, TypeScript
- One server-side route: the contact form endpoint, a Cloudflare Pages Function (`functions/api/contact.ts`)
- Plain CSS (design tokens in `src/styles/tokens.css`)
- Minimal client JS (language selector closing, Home hero slideshow, 404 localisation, contact form)
- Images optimised at build time by Astro (`astro:assets` + sharp → responsive WebP)
- Typefaces (self-hosted, `src/styles/fonts.ts`): Cormorant Garamond 400 (`@fontsource/cormorant-garamond`) for all text; IBM Plex Sans 400 (`@fontsource/ibm-plex-sans`) for digits in UI counters only

## Requirements

- Node.js **≥ 22.12** (see `engines` in `package.json`)
- npm

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # static build → dist/
npm run preview    # serve the built site locally
npm run check      # Astro + TypeScript diagnostics
```

`npm run dev` serves the site UI only. The contact endpoint is a Cloudflare Pages
Function, which Astro's dev server does not run: submitting the form there shows
the localized error state (by design — it never pretends to succeed). To run the
real endpoint locally, see [Contact form → Local testing](#local-testing).

## Locales

Seven locales, all URL-prefixed: `tr`, `en`, `de`, `fr`, `es`, `it`, `ru`.

- Locale list, native names and the default locale: `src/i18n/locales.ts`
- Route helpers and language-switch path mapping: `src/i18n/routes.ts`
- Structural UI strings (navigation, labels, form): `src/i18n/ui.ts`
- `/` is a language entry route that redirects to `DEFAULT_LOCALE` (`de`; no automatic language detection).
- The language selector keeps the equivalent page: `/en/projects/walden/` → `/de/projects/walden/`.

## URL convention

Clean directory URLs with a trailing slash everywhere
(`build.format: "directory"`, `trailingSlash: "always"`):

```
/en/  /en/projects/  /en/projects/casa-olivia/  /de/about/  /tr/services/
```

Never link to `.html` files.

## Content

Content is local and temporary until the CMS is integrated.

```
src/data/
  placeholder.ts   TEMPORARY Lorem Ipsum — every placeholder string lives here
  site.ts          brand, domain, contact/social (null until real values exist)
  pages.ts         page-level copy and page images
  projects.ts      project records (image sequence, metadata)
  types.ts         source content shapes
  index.ts         access layer: records → view models used by pages
```

Pages import only from `src/data/index.ts`. Replacing the data source (Sanity)
should only require changing that module to map CMS data into the same shapes.

Unknown facts (project type, location, year, area, credits, contact details)
are left `null` and simply not rendered — never fill them with guesses.

Contact page copy is in `src/data/pages.ts` (`CONTACT`); contact form strings
(labels, project types, states, confirmation email) are in `src/i18n/ui.ts` (`contactForm`).

### Images

`src/assets/` holds a curated working copy of the images used on the site.
The master source collection lives **outside** this repository and is not modified.
Photographic PNG masters were stored here as high-quality JPEG working copies;
Astro generates the responsive WebP derivatives at build time.

## Contact form

```
browser (/{locale}/contact/)
  → POST /api/contact            functions/api/contact.ts   (Cloudflare Pages Function)
      → method / origin / content-type / size checks, honeypot, validation
      → Resend API: business notification → To studio inbox, Cc Batur, Reply-To = visitor
      → Resend API: confirmation → visitor, in the submitted locale, Reply-To = studio inbox
```

| File | Role |
| --- | --- |
| `src/components/ContactForm.astro` | Form markup, inline states, client validation |
| `src/lib/contact.ts` | Shared contract: fields, project types, limits, validation (browser + server) |
| `src/server/contact-email.ts` | Server only: email templates and the Resend adapter |
| `functions/api/contact.ts` | The endpoint |

- Only `/api/contact` runs server-side; every page stays static. Cloudflare Pages
  picks up the `functions/` directory automatically on deploy.
- The form sends its page locale explicitly; the server accepts only
  `de tr en fr es it ru` and writes the visitor confirmation in that language.
- The business notification is one email (English): To the studio inbox, Cc Batur.
  Its Reply-To is the visitor, so replying answers them directly. From is always
  the configured sender, never the visitor.
- The visitor confirmation's Reply-To is the public studio inbox, so a reply to
  it reaches Atelis Design; Batur's personal address is never exposed to visitors.
- A submission counts as successful only when the provider accepts the business
  notification. Missing configuration, provider errors and timeouts show the
  localized error message and keep what the visitor typed. If only the
  confirmation fails, the request still succeeds (the lead is already delivered)
  and the failure is logged server-side.
- Desktop layout: header, the contact composition and the footer fit the first
  screen; the message box takes the height that is left (7–15rem). Visitors can
  still drag it taller, and the page then scrolls.
- Without JavaScript the form still works as a plain POST; the endpoint redirects
  back to `/{locale}/contact/#contact-sent` or `#contact-failed`.

### Environment variables

| Variable | Required | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key — store as an **encrypted secret** |
| `CONTACT_FROM_EMAIL` | yes | Verified sender, e.g. `Atelis Design <contact@atelisdesign.com>` |
| `CONTACT_TO_EMAIL` | no | Business inbox (To). Default / production: `atelisdesign.studio@gmail.com` |
| `CONTACT_CC_EMAIL` | no | Copied on every business notification (Cc). Default / production: `baturberrak002@gmail.com` |
| `CONTACT_REPLY_EMAIL` | no | Reply-To of the visitor confirmation. Default / production: `atelisdesign.studio@gmail.com` |

The three routing variables are not secret and default to the production values
above when unset (a Cc equal to the To address is dropped). Set the variables in
Cloudflare Pages → Settings → Variables and Secrets (Production and Preview).
Never commit the API key.

### Local testing

```bash
cp .dev.vars.example .dev.vars    # then fill in real values (git-ignored)
npm run build
npx wrangler pages dev dist       # site + /api/contact at http://localhost:8788
```

Without `.dev.vars`, the endpoint answers `503 not_configured` and the form shows
its error state.

### Before going live

1. Create a Resend account and an API key.
2. Add and verify the sending domain (`atelisdesign.com`) in Resend — DNS records
   (SPF/DKIM) at the domain's DNS host.
3. Set the environment variables above in Cloudflare Pages.
4. Send a test from each locale and confirm the notification arrives in the studio
   inbox (with Batur in Cc) and the localized confirmation at the visitor address.

## Future (not configured)

- **CMS:** Sanity (Content Lake + Studio), project ID `3dt7e75y`, dataset `production`,
  studio planned at `admin.atelisdesign.com`
- **Hosting:** Cloudflare Pages (publish in Sanity → build trigger → Cloudflare Pages)
- **Domain:** atelisdesign.com cutover
