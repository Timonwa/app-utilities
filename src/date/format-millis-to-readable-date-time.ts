/**
 * Formats milliseconds as a readable date and time string.
 * @param millis - Source milliseconds
 * @param locale - Locale string for formatting
 * @returns Readable date-time string
 * @example formatMillisToReadableDateTime(1705276800000) // "January 15, 2024, 12:00 AM"
 */
export function formatMillisToReadableDateTime(
  millis: number,
  locale: string = "en-US",
): string {
  return new Date(millis).toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
