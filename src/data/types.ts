import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/locales';

/**
 * Source-side content shapes (what a data source provides).
 * Today the source is local files in `src/data/`; later a Sanity adapter
 * should return these same shapes so the UI does not change.
 */

/** Text per locale. Missing locales fall back to DEFAULT_LOCALE. */
export type Localized<T = string> = Partial<Record<Locale, T>>;

export interface ImageAsset {
  src: ImageMetadata;
  /** Real descriptive alt text, when written. `null` → a neutral generated alt is used. */
  alt: Localized | null;
}

/**
 * Portfolio category — what kind of space a project is; drives the Projects filter.
 * Stable keys; localized labels live in ui.ts (projectsIndex.categories).
 * Not the design style: that is `ProjectRecord.concept`.
 */
export type PortfolioCategory = 'residential' | 'hospitality' | 'commercial' | 'retail';

export interface Credit {
  role: Localized;
  name: string;
}

export interface ProjectRecord {
  /** Internal, stable route key (URL segment). Not a client-editable field. */
  id: string;
  title: string;
  /** Portfolio category (Projects filter). */
  portfolioCategory: PortfolioCategory;
  /** Design concept / style descriptor, shown as written in every locale. */
  concept: string;
  /** Position on the Projects index; also the order of project-to-project navigation. */
  listingOrder: number;
  /**
   * Project facts and text for the detail page. `null` = not supplied yet: the
   * field is simply not shown. Never fill these with guesses.
   */
  /** Finer project type (e.g. a villa); the detail page shows the portfolio category when null. */
  projectType: Localized | null;
  /** Project description in every locale. */
  description: Localized | null;
  location: Localized | null;
  year: number | null;
  /** Free text such as "240 m²". */
  area: string | null;
  /** Scope of work, e.g. interior design. */
  scope: Localized | null;
  /** Opening image of the detail page. */
  heroImage: ImageAsset;
  /** Image used on listings (home, projects index). Falls back to heroImage. */
  coverImage?: ImageAsset;
  /** The project's further photographs, in viewing order (the detail gallery follows heroImage). */
  gallery: ImageAsset[];
  credits: Credit[];
  featured: boolean;
  homepageOrder: number | null;
  seo: { title?: Localized; description?: Localized } | null;
}
