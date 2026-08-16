/**
 * Joins path segments into a Cloudinary `public_id`, dropping empties and replacing the
 * characters Cloudinary treats specially in a URL.
 *
 * Pass whatever hierarchy the product uses — the shape is the caller's decision, the
 * escaping is not.
 *
 * @example buildCloudinaryPublicId(["events", eventId, photoId]) // "events/ev_1/ph_2"
 * @example buildCloudinaryPublicId(["users", "a b?c"]) // "users/a-b-c"
 */
export function buildCloudinaryPublicId(segments: Array<string | number>): string {
  return (
    segments
      .map((segment) => String(segment).trim())
      .filter(Boolean)
      // ? & # % + and whitespace either terminate a URL early or need encoding.
      .map((segment) => segment.replace(/[?&#%+\s]+/g, "-").replace(/^-+|-+$/g, ""))
      .filter(Boolean)
      .join("/")
  );
}
