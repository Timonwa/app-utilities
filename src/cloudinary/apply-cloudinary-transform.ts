import { isTransformSegment, UPLOAD_MARKER } from "./_shared.js";
import { isCloudinaryUrl } from "./is-cloudinary-url.js";

/**
 * Inserts a transform into an existing Cloudinary URL, chaining ahead of any transforms
 * already there. Returns the URL untouched if it isn't a Cloudinary URL or has no upload
 * segment, so this is safe to call across a mixed list of image sources.
 *
 * @example
 * applyCloudinaryTransform("https://res.cloudinary.com/d/image/upload/v1/a.jpg", "w_40")
 * // ".../upload/w_40/v1/a.jpg"
 */
export function applyCloudinaryTransform(url: string, transform: string): string {
  if (!isCloudinaryUrl(url)) return url;

  const markerIndex = url.indexOf(UPLOAD_MARKER);
  if (markerIndex === -1) return url;

  const head = url.slice(0, markerIndex + UPLOAD_MARKER.length);
  const tail = url.slice(markerIndex + UPLOAD_MARKER.length);

  const firstSegment = tail.split("/")[0] ?? "";
  if (!isTransformSegment(firstSegment)) return `${head}${transform}/${tail}`;

  const rest = tail.slice(firstSegment.length + 1);
  return `${head}${firstSegment},${transform}/${rest}`;
}
