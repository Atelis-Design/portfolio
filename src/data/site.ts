/**
 * Site-wide settings. Contact and social values are client-approved; anything
 * still null renders a neutral "details to follow" state. Never fill with guesses.
 */

/** Production origin — the single source for Astro `site`, canonical and hreflang URLs. */
export const SITE_URL = 'https://atelisdesign.com';

export const SITE = {
  /** Working brand name; final public naming is not confirmed yet. */
  brand: 'Atelis Design',
  domain: SITE_URL,
  /** Browser UI colour; mirrors --color-surface-primary in tokens.css. */
  themeColor: '#e0d7cf',
  contact: {
    email: 'atelisdesign.studio@gmail.com' as string | null,
    phone: null as string | null,
    location: null as string | null,
  },
  social: {
    /** Full profile URLs. */
    instagram: 'https://www.instagram.com/atelisdesign/' as string | null,
    linkedin: 'https://www.linkedin.com/in/baturberrak/' as string | null,
  },
} as const;
