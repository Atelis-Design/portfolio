import type { APIRoute } from 'astro';
import { getProjectIds } from '../data';
import { LOCALES } from '../i18n/locales';
import { absoluteUrl, localizedPath, projectPath, type RouteKey } from '../i18n/routes';

export const prerender = true;

const PAGE_ROUTES: RouteKey[] = ['home', 'projects', 'services', 'about', 'contact'];

function xmlEscape(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

export const GET: APIRoute = () => {
  const urls = LOCALES.flatMap((locale) => [
    ...PAGE_ROUTES.map((route) => absoluteUrl(localizedPath(locale, route))),
    ...getProjectIds().map((project) => absoluteUrl(projectPath(locale, project))),
  ]);

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
