/**
 * Projects index grid composition — pure and framework-free, so it works for any
 * data source (local records today, a CMS adapter later) without markup changes.
 *
 * "All" shows every published project in listing order, then "Coming soon" frames:
 * enough to reach the editorial minimum of six cards, and never fewer than one.
 * There is no page-size cap: every project is listed in one continuous grid.
 * A category shows only its own projects; a category with none shows a single
 * Coming soon frame instead of an empty space. Coming soon frames are layout
 * only: never projects, routes or records.
 */

/** Editorial minimum of visible cards in the "All" grid. */
export const MIN_ALL_CARDS = 6;
/** The "All" grid always ends with at least this many Coming soon frames. */
export const MIN_COMING_SOON = 1;

export function comingSoonCount(projectCount: number): number {
  return Math.max(MIN_COMING_SOON, MIN_ALL_CARDS - projectCount);
}

export type GridSlot<P, I> = { kind: 'project'; project: P } | { kind: 'soon'; image: I };

/** Picks the supplied preview images in order, repeating them when more frames than images are needed. */
function previewAt<I>(images: readonly I[], index: number): I {
  if (images.length === 0) throw new Error('At least one Coming soon preview image is required.');
  return images[index % images.length];
}

/** The unfiltered grid: all projects first, then the trailing Coming soon frames. */
export function allGrid<P, I>(projects: readonly P[], images: readonly I[]): GridSlot<P, I>[] {
  const fillers = Array.from({ length: comingSoonCount(projects.length) }, (_, i) => ({
    kind: 'soon' as const,
    image: previewAt(images, i),
  }));
  return [...projects.map((project) => ({ kind: 'project' as const, project })), ...fillers];
}

/** One Coming soon frame for each category that has no published project yet. */
export function emptyCategoryPreviews<C extends string, I>(
  categories: readonly C[],
  projectCategories: readonly C[],
  images: readonly I[],
): { category: C; image: I }[] {
  const used = new Set(projectCategories);
  return categories.filter((category) => !used.has(category)).map((category, i) => ({ category, image: previewAt(images, i) }));
}

/** Number of visible cards for a filter: what the 01 — NN counter shows. */
export function visibleCardCount<C extends string>(filter: C | 'all', projectCategories: readonly C[]): number {
  if (filter === 'all') return projectCategories.length + comingSoonCount(projectCategories.length);
  const own = projectCategories.filter((category) => category === filter).length;
  return own > 0 ? own : 1;
}
