# Atelis Design — Portfolio

Public portfolio website for the interior architecture practice of Batur Berrak
(working brand: **Atelis Design**). Image-led, editorial, static.

Production domain: **https://atelisdesign.com**

> **Not yet configured:** CMS integration, deployment, and domain cutover.
> This repository currently builds a local static site only.

## Stack

- [Astro](https://astro.build) 7 — static output, TypeScript
- Plain CSS (design tokens in `src/styles/tokens.css`)
- Minimal client JS (language selector closing, Home hero slideshow, 404 localisation)
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

### Images

`src/assets/` holds a curated working copy of the images used on the site.
The master source collection lives **outside** this repository and is not modified.
Photographic PNG masters were stored here as high-quality JPEG working copies;
Astro generates the responsive WebP derivatives at build time.

## Future (not configured)

- **CMS:** Sanity (Content Lake + Studio), project ID `3dt7e75y`, dataset `production`,
  studio planned at `admin.atelisdesign.com`
- **Hosting:** Cloudflare Pages (publish in Sanity → build trigger → Cloudflare Pages)
- **Domain:** atelisdesign.com cutover
