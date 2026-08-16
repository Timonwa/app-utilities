/**
 * Returns everything before the last hyphen of a URL-decoded slug with hyphens turned into spaces — the name in `name-id` slugs.
 *
 * @example extractNameFromSlug("summer-fete-a1b2") // "summer fete"
 */
export function extractNameFromSlug(slug: string): string {
  return decodeURIComponent(slug).split("-").slice(0, -1).join(" ");
}
