import { isTransformSegment, UPLOAD_MARKER } from "./_shared.js";
import { isCloudinaryUrl } from "./is-cloudinary-url.js";

/**
 * Recovers the `public_id` from a delivery URL — the inverse of `buildCloudinaryUrl`.
 * Skips any transform chain and version segment, and drops the file extension, since
 * the extension is delivery format rather than identity.
 *
 * @example
 * extractPublicIdFromCloudinaryUrl(
 *   "https://res.cloudinary.com/demo/image/upload/w_300/v1712345/events/e1/p2.jpg",
 * ) // "events/e1/p2"
 */
export function extractPublicIdFromCloudinaryUrl(url: string): string | undefined {
  if (!isCloudinaryUrl(url)) return undefined;

  const markerIndex = url.indexOf(UPLOAD_MARKER);
  if (markerIndex === -1) return undefined;

  const segments = url
    .slice(markerIndex + UPLOAD_MARKER.length)
    .split(/[?#]/)[0] // query and fragment are not part of the id
    ?.split("/")
    .filter(Boolean);
  if (!segments?.length) return undefined;

  let start = 0;
  if (isTransformSegment(segments[start] ?? "")) start += 1;
  if (/^v\d+$/.test(segments[start] ?? "")) start += 1;

  const path = segments.slice(start).join("/");
  if (!path) return undefined;

  return path.replace(/\.[a-z0-9]+$/i, "");
}
