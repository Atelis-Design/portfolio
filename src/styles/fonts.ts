/**
 * Cormorant Garamond 400 (normal), self-hosted from @fontsource/cormorant-garamond.
 * Bundled by Vite into /_astro — no third-party font requests at runtime.
 *
 * Only the subsets our locales need are declared (WOFF2 only; every target
 * browser supports it). `unicode-range` lets the browser fetch a subset only
 * when a page actually uses those characters:
 *   latin      → en, de, fr, es, it (+ most tr)
 *   latin-ext  → tr (ğ, İ, ş …), and rare accents
 *   cyrillic   → ru
 */
import cyrillic from '@fontsource/cormorant-garamond/files/cormorant-garamond-cyrillic-400-normal.woff2?url';
import latinExt from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-ext-400-normal.woff2?url';
import latin from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2?url';
// Numerals: IBM Plex Sans 400, used only for digits (Cormorant's figures are too soft for UI counters).
import plexLatin from '@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2?url';

const face = (src: string, range: string, family = 'Cormorant Garamond') => `@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(${src}) format('woff2');
  unicode-range: ${range};
}`;

/** Preloaded on every page (the latin subset covers the shared shell). */
export const FONT_PRELOAD = latin;

export const FONT_FACE_CSS = [
  face(cyrillic, 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116'),
  face(
    latinExt,
    'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
  ),
  face(
    latin,
    'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  ),
  // 'Atelis Numerals' covers digits 0–9 only; every other character falls through to Cormorant.
  face(plexLatin, 'U+0030-0039', 'Atelis Numerals'),
].join('\n');
