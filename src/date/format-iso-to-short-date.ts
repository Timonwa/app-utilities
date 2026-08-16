/**
 * Formats an ISO string to a short date.
 * @param isoString - ISO date string
 * @param locale - Locale string for formatting
 * @returns Short date string
 * @example formatISOToShortDate("2024-01-15T10:30:00.000Z") // "1/15/24"
 */
export function formatISOToShortDate(
  isoString: string,
  locale: string = "en-US",
): string {
  const date = new Date(isoString);
  return date.toLocaleDateString(locale, {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });
}
