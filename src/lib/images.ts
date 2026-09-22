import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/**
 * Shared image settings and a safe way to read image dimensions.
 *
 * Imported images are proxies: reading a property such as `.width` directly
 * marks the original file as "referenced", and Astro then copies the full
 * unoptimised original into `dist`. Always read dimensions through
 * `imageSize()` (public `getImage` API) instead of `image.width`.
 */

/** Responsive widths; Astro drops any above the source width and adds the source width. */
export const IMAGE_WIDTHS = [480, 768, 1080, 1440, 1920, 2560];
export const IMAGE_FORMAT = 'webp';
export const IMAGE_QUALITY = 80;

const cache = new WeakMap<ImageMetadata, ReturnType<typeof getImage>>();

/** Same transform options as <Photo>, so no extra derivative files are generated. */
function optimize(src: ImageMetadata) {
  let result = cache.get(src);
  if (!result) {
    result = getImage({ src, widths: IMAGE_WIDTHS, format: IMAGE_FORMAT, quality: IMAGE_QUALITY });
    cache.set(src, result);
  }
  return result;
}

export async function imageSize(src: ImageMetadata): Promise<{ width: number; height: number; ratio: number; portrait: boolean }> {
  const { attributes } = await optimize(src);
  const width = Number(attributes.width);
  const height = Number(attributes.height);
  return { width, height, ratio: width / height, portrait: height > width };
}
