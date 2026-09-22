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

export type ImageSize = 'bleed' | 'wide' | 'inset' | 'detail';
export type Align = 'start' | 'end';

/** Small vocabulary of editorial gallery treatments. */
export type GalleryBlock =
  | { type: 'image'; image: ImageAsset; size: ImageSize; align?: Align }
  | { type: 'row'; images: ImageAsset[]; size: 'wide' | 'inset' }
  | { type: 'text'; text: Localized };

export interface Credit {
  role: Localized;
  name: string;
}

export interface ProjectRecord {
  /** Internal, stable route key (URL segment). Not a client-editable field. */
  id: string;
  title: string;
  projectType: Localized | null;
  location: Localized | null;
  year: number | null;
  /** Free text such as "240 m²". */
  area: string | null;
  shortDescription: Localized;
  projectStory: Localized<string[]>;
  heroImage: ImageAsset;
  /** Image used on listings (home, projects index). Falls back to heroImage. */
  coverImage?: ImageAsset;
  gallery: GalleryBlock[];
  credits: Credit[];
  featured: boolean;
  homepageOrder: number | null;
  seo: { title?: Localized; description?: Localized } | null;
}
