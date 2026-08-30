/**
 * Pulls a handle out of whatever a user pasted into a "social link" field — a full
 * URL, a bare `@handle`, or the handle alone.
 *
 * @example extractSocialUsername("https://instagram.com/timonwa/") // "timonwa"
 * @example extractSocialUsername("@timonwa") // "timonwa"
 */
export function extractSocialUsername(value: string): string {
  return value
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(
      /^(instagram\.com|x\.com|twitter\.com|facebook\.com|fb\.com|tiktok\.com|linkedin\.com(?:\/in|\/company)?|threads\.net|bsky\.app|github\.com|youtube\.com)\//i,
      "",
    )
    .replace(/^@/, "")
    .replace(/[/?#].*$/, "");
}
