import { SITE_URL } from '../data/site';
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './locales';

/**
 * Route keys are locale-independent. URL segments are currently the same in
 * every language (English), which keeps language switching a simple prefix swap.
 */
export type RouteKey = 'home' | 'projects' | 'services' | 'about' | 'contact';

const ROUTE_SEGMENTS: Record<RouteKey, string> = {
  home: '',
  projects: 'projects',
  services: 'services',
  about: 'about',
  contact: 'contact',
};

/** Ensure the site-wide trailing-slash convention: `/en/projects/`. */
function withSlashes(path: string): string {
  const joined = '/' + path.split('/').filter(Boolean).join('/');
  return joined === '/' ? '/' : `${joined}/`;
}

export function localizedPath(locale: Locale, route: RouteKey, hash?: string): string {
  const path = withSlashes(`${locale}/${ROUTE_SEGMENTS[route]}`);
  return hash ? `${path}#${hash}` : path;
}

export function projectPath(locale: Locale, projectKey: string): string {
  return withSlashes(`${locale}/projects/${projectKey}`);
}

export function rootPath(): string {
  return '/';
}

/** Split `/de/projects/walden/` into its locale and the remaining path. */
export function parseLocalePath(pathname: string): { locale: Locale | null; rest: string } {
  const [first, ...rest] = pathname.split('/').filter(Boolean);
  if (isLocale(first)) return { locale: first, rest: rest.join('/') };
  return { locale: null, rest: [first, ...rest].filter(Boolean).join('/') };
}

/** Equivalent route in another language: `/en/projects/` → `/de/projects/`. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { locale, rest } = parseLocalePath(pathname);
  if (!locale) return withSlashes(target);
  return withSlashes(`${target}/${rest}`);
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

export { DEFAULT_LOCALE, LOCALES };
