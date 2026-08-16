import { buildCloudinaryResizedUrl } from "./build-cloudinary-resized-url.js";
import { DEFAULT_RESPONSIVE_WIDTHS } from "./default-responsive-widths.js";
import { isCloudinaryUrl } from "./is-cloudinary-url.js";

/**
 * A `srcset` value covering the given widths.
 *
 * Returns an empty string for a non-Cloudinary URL, so the attribute can be omitted rather
 * than pointing the browser at a set it cannot use.
 *
 * @example buildCloudinarySrcset(url) // ".../w_480/... 480w, .../w_768/... 768w, …"
 */
export function buildCloudinarySrcset(
  url: string,
  widths: readonly number[] = DEFAULT_RESPONSIVE_WIDTHS,
): string {
  if (!isCloudinaryUrl(url)) return "";

  return widths
    .map((width) => `${buildCloudinaryResizedUrl(url, width)} ${width}w`)
    .join(", ");
}
