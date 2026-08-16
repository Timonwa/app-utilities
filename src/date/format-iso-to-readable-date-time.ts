/**
 * Formats an ISO string to a readable date and time.
 * @param isoString - ISO date string
 * @param locale - Locale string for formatting
 * @returns Readable date-time string
 * @example formatISOToReadableDateTime("2024-01-15T10:30:00.000Z") // "January 15, 2024, 10:30 AM"
 */
export function formatISOToReadableDateTime(
  isoString: string,
  locale: string = "en-US",
): string {
  const date = new Date(isoString);
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
