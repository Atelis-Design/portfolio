/**
 * Content access layer.
 *
 *   data source (local files today, Sanity later)
 *        ↓  this module maps records → view models
 *   page / component props
 *        ↓
 *   UI
 *
 * Pages and components import only from here, never from the raw data files,
 * so swapping the data source means changing this module only.
 */
import type { ImageMetadata } from 'astro';
import { DEFAULT_LOCALE, type Locale } from '../i18n/locales';
import { format, useUi } from '../i18n/ui';
import { HOME } from './pages';
import { PROJECTS } from './projects';
import type { ImageAsset, Localized, PortfolioCategory, ProjectRecord } from './types';

export { SITE } from './site';
export { ABOUT, CONTACT, HOME, PROJECTS_PAGE, SERVICES } from './pages';
export type { ImageAsset, Localized, PortfolioCategory } from './types';

/** Portfolio categories in filter order (the Projects page adds "all" in front). */
export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = ['residential', 'hospitality', 'commercial', 'retail'];

/** Content fallback order after the requested locale (English holds today's placeholder copy). */
const CONTENT_FALLBACKS: Locale[] = [DEFAULT_LOCALE, 'en'];

/**
 * Which locale's text is used: the requested locale, else DEFAULT_LOCALE,
 * else English, else any locale that has content. Client copy supplied for one
 * locale (e.g. Turkish) is therefore never shown on another locale's page
 * while an English fallback exists.
 */
function resolveLocale(value: Localized<unknown>, locale: Locale): Locale | null {
  if (value[locale] !== undefined) return locale;
  for (const fallback of CONTENT_FALLBACKS) if (value[fallback] !== undefined) return fallback;
  return (Object.keys(value) as Locale[]).find((key) => value[key] !== undefined) ?? null;
}

/** Resolve localized content with fallback (see resolveLocale). */
export function localize<T>(value: Localized<T>, locale: Locale): T;
export function localize<T>(value: Localized<T> | null | undefined, locale: Locale): T | null;
export function localize<T>(value: Localized<T> | null | undefined, locale: Locale): T | null {
  if (!value) return null;
  const key = resolveLocale(value, locale);
  return key ? (value[key] ?? null) : null;
}

/**
 * lang attribute for content that fell back to another locale (e.g. English
 * placeholder copy on /tr/), so case transforms and screen readers use the right language.
 */
export function fallbackLang(value: Localized<unknown> | null | undefined, locale: Locale): Locale | undefined {
  if (!value) return undefined;
  const key = resolveLocale(value, locale);
  return key && key !== locale ? key : undefined;
}

export interface ViewImage {
  src: ImageMetadata;
  alt: string;
  /** Focal point for the project viewer's 16:9 crop, when the image needs one. */
  position?: string;
}

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  category: PortfolioCategory;
  concept: string;
  cover: ViewImage;
}

export interface ProjectView extends ProjectSummary {
  /** The localized portfolio category. */
  categoryLabel: string;
  /** One concise sentence for the information panel; null when there is none. */
  intro: string | null;
  /** Full project text: kept for the meta description and later editorial use, not rendered on the page. */
  description: string | null;
  /** Facts that exist, in display order (project type, location, year, area, scope). */
  meta: ProjectMeta[];
  /** Every photograph once: the opening image, then the gallery in order. */
  images: ViewImage[];
  /** Canonical Home hero used by social previews for this project. */
  socialImage: ViewImage;
  credits: { role: string; name: string }[];
  seoTitle: string | null;
  seoDescription: string;
  index: number;
  total: number;
  previous: ProjectSummary;
  next: ProjectSummary;
}

/**
 * Canonical project order (Projects index, project numbering, previous/next).
 * The Home carousel renders HOME.hero.slides, listed in this same order; `homepageOrder` mirrors it.
 */
function sortedRecords(): ProjectRecord[] {
  return [...PROJECTS].sort((a, b) => a.listingOrder - b.listingOrder);
}

/** Only the metadata that actually exists — unknown fields are omitted, not invented. */
function projectMeta(record: ProjectRecord, locale: Locale): ProjectMeta[] {
  const ui = useUi(locale).project;
  const rows: [string, string | null][] = [
    [ui.projectType, localize(record.projectType, locale)],
    [ui.location, localize(record.location, locale)],
    [ui.year, record.year ? String(record.year) : null],
    [ui.area, record.area],
    [ui.scope, localize(record.scope, locale)],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1])).map(([label, value]) => ({ label, value }));
}

/** A project's photographs in viewing order, each once: the opening image, then the gallery. */
function projectImages(record: ProjectRecord): ImageAsset[] {
  const seen = new Set<ImageMetadata>();
  return [record.heroImage, ...record.gallery].filter((asset) => !seen.has(asset.src) && seen.add(asset.src));
}

/** Number every image of a project so generated alts read "Title — image n of N". */
function createAltResolver(record: ProjectRecord, locale: Locale) {
  const images = projectImages(record).map((asset) => asset.src);
  const template = useUi(locale).project.imageAlt;
  const alt = (asset: ImageAsset): string => {
    const written = localize(asset.alt, locale);
    if (written) return written;
    const index = images.indexOf(asset.src);
    if (index === -1) return record.title;
    return format(template, { title: record.title, n: index + 1, total: images.length });
  };
  return (asset: ImageAsset): ViewImage => ({ src: asset.src, alt: alt(asset), position: asset.position });
}

function toSummary(record: ProjectRecord, locale: Locale): ProjectSummary {
  const resolve = createAltResolver(record, locale);
  return {
    id: record.id,
    title: record.title,
    category: record.portfolioCategory,
    concept: record.concept,
    cover: resolve(record.coverImage ?? record.heroImage),
  };
}

/** Meta description length: the project text's opening sentence (the full text is too long for a snippet). */
function firstSentence(text: string): string {
  const end = text.search(/[.!?](\s|$)/);
  return end === -1 ? text : text.slice(0, end + 1);
}

export function getProjectIds(): string[] {
  return sortedRecords().map((record) => record.id);
}

export function getProjects(locale: Locale): ProjectSummary[] {
  return sortedRecords().map((record) => toSummary(record, locale));
}

export function getFeaturedProjects(locale: Locale): ProjectSummary[] {
  return sortedRecords()
    .filter((record) => record.featured)
    .sort((a, b) => (a.homepageOrder ?? Infinity) - (b.homepageOrder ?? Infinity))
    .map((record) => toSummary(record, locale));
}

export function getProjectSummary(id: string, locale: Locale): ProjectSummary | null {
  const record = sortedRecords().find((item) => item.id === id);
  return record ? toSummary(record, locale) : null;
}

export function getProject(id: string, locale: Locale): ProjectView | null {
  const records = sortedRecords();
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) return null;
  const record = records[index];
  const resolve = createAltResolver(record, locale);
  const total = records.length;
  const intro = localize(record.heroIntro, locale);
  const description = localize(record.description, locale);
  /** Meta description source: the project description, else the panel sentence. */
  const summary = description ?? intro;
  const socialAsset = HOME.hero.slides.find((slide) => slide.projectId === record.id)?.image ?? record.heroImage;
  return {
    ...toSummary(record, locale),
    categoryLabel: useUi(locale).projectsIndex.categories[record.portfolioCategory],
    intro,
    description,
    meta: projectMeta(record, locale),
    images: projectImages(record).map(resolve),
    socialImage: {
      src: socialAsset.src,
      alt: localize(socialAsset.alt, locale) ?? `${record.title} — Atelis Design`,
    },
    credits: record.credits.map((credit) => ({ role: localize(credit.role, locale), name: credit.name })),
    seoTitle: localize(record.seo?.title, locale),
    seoDescription:
      localize(record.seo?.description, locale) ??
      (summary ? firstSentence(summary) : localize(HOME.meta.description, locale)),
    index: index + 1,
    total,
    previous: toSummary(records[(index - 1 + total) % total], locale),
    next: toSummary(records[(index + 1) % total], locale),
  };
}

/** Resolve a standalone image (not tied to a project gallery). */
export function viewImage(asset: ImageAsset, locale: Locale, fallbackAlt: string): ViewImage {
  return { src: asset.src, alt: localize(asset.alt, locale) ?? fallbackAlt };
}
