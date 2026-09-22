/**
 * Single source of truth for supported locales.
 * Change DEFAULT_LOCALE here to change the root redirect and content fallback.
 */
export const LOCALES = ['tr', 'en', 'de', 'fr', 'es', 'it', 'ru'] as const;

export type Locale = (typeof LOCALES)[number];

/** German: primary audience is Germany/Switzerland. Used by the root `/` redirect. */
export const DEFAULT_LOCALE: Locale = 'de';

/** Native names, shown in the language selector. */
export const LOCALE_NAMES: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  ru: 'Русский',
};

/** Values for Open Graph `og:locale`. */
export const OG_LOCALES: Record<Locale, string> = {
  tr: 'tr_TR',
  en: 'en_GB',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
  it: 'it_IT',
  ru: 'ru_RU',
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** For getStaticPaths in every `[locale]` route. */
export function localeStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}
