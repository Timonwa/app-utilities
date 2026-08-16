/**
 * Returns the segment after the last hyphen of a URL-decoded slug — the id in `name-id` slugs.
 *
 * @example extractIdFromSlug("summer-fete-a1b2") // "a1b2"
 */
export function extractIdFromSlug(slug: string): string {
  const parts = decodeURIComponent(slug).split("-");
  return parts[parts.length - 1] ?? "";
}
