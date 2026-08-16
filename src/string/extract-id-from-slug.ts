/** @example extractIdFromSlug("summer-fete-a1b2") // "a1b2" */
export function extractIdFromSlug(slug: string): string {
  const parts = decodeURIComponent(slug).split("-");
  return parts[parts.length - 1] ?? "";
}
