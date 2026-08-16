/** @example extractNameFromSlug("summer-fete-a1b2") // "summer fete" */
export function extractNameFromSlug(slug: string): string {
  return decodeURIComponent(slug).split("-").slice(0, -1).join(" ");
}
