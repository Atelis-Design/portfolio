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
import { PROJECTS } from './projects';
import type { Align, GalleryBlock, ImageAsset, ImageSize, Localized, ProjectRecord } from './types';

export { SITE } from './site';
export { ABOUT, CONTACT, HOME, PROJECTS_PAGE, SERVICES } from './pages';
export type { ImageAsset, Localized } from './types';

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
}

export type ViewBlock =
  | { type: 'image'; image: ViewImage; size: ImageSize; align?: Align }
  | { type: 'row'; images: ViewImage[]; size: 'wide' | 'inset' }
  | { type: 'text'; text: string };

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  shortDescription: string;
  cover: ViewImage;
  hero: ViewImage;
  meta: ProjectMeta[];
}

export interface ProjectView extends ProjectSummary {
  story: string[];
  gallery: ViewBlock[];
  credits: { role: string; name: string }[];
  seoTitle: string | null;
  seoDescription: string;
  index: number;
  total: number;
  previous: ProjectSummary;
  next: ProjectSummary;
}

function sortedRecords(): ProjectRecord[] {
  return PROJECTS;
}

/** Only the metadata that actually exists — unknown fields are omitted, not invented. */
function projectMeta(record: ProjectRecord, locale: Locale): ProjectMeta[] {
  const ui = useUi(locale).project;
  const rows: [string, string | null][] = [
    [ui.projectType, localize(record.projectType, locale)],
    [ui.location, localize(record.location, locale)],
    [ui.year, record.year ? String(record.year) : null],
    [ui.area, record.area],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1])).map(([label, value]) => ({ label, value }));
}

/** Number every image of a project so generated alts read "Title — image n of N". */
function createAltResolver(record: ProjectRecord, locale: Locale) {
  const images: ImageMetadata[] = [record.heroImage.src];
  for (const block of record.gallery) {
    if (block.type === 'image') images.push(block.image.src);
    if (block.type === 'row') images.push(...block.images.map((image) => image.src));
  }
  const template = useUi(locale).project.imageAlt;
  return (asset: ImageAsset): ViewImage => {
    const written = localize(asset.alt, locale);
    if (written) return { src: asset.src, alt: written };
    const position = images.indexOf(asset.src);
    if (position === -1) return { src: asset.src, alt: record.title };
    return { src: asset.src, alt: format(template, { title: record.title, n: position + 1, total: images.length }) };
  };
}

function toSummary(record: ProjectRecord, locale: Locale): ProjectSummary {
  const resolve = createAltResolver(record, locale);
  return {
    id: record.id,
    title: record.title,
    shortDescription: localize(record.shortDescription, locale),
    cover: resolve(record.coverImage ?? record.heroImage),
    hero: resolve(record.heroImage),
    meta: projectMeta(record, locale),
  };
}

function toBlock(block: GalleryBlock, resolve: (asset: ImageAsset) => ViewImage, locale: Locale): ViewBlock {
  switch (block.type) {
    case 'image':
      return { type: 'image', image: resolve(block.image), size: block.size, align: block.align };
    case 'row':
      return { type: 'row', images: block.images.map(resolve), size: block.size };
    case 'text':
      return { type: 'text', text: localize(block.text, locale) };
  }
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
  const shortDescription = localize(record.shortDescription, locale);
  return {
    ...toSummary(record, locale),
    story: localize(record.projectStory, locale) ?? [],
    gallery: record.gallery.map((block) => toBlock(block, resolve, locale)),
    credits: record.credits.map((credit) => ({ role: localize(credit.role, locale), name: credit.name })),
    seoTitle: localize(record.seo?.title, locale),
    seoDescription: localize(record.seo?.description, locale) ?? shortDescription,
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
