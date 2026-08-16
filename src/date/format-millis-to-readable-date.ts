/**
 * Formats milliseconds as a readable date string.
 * @param millis - Source milliseconds
 * @param locale - Locale string for formatting
 * @param options - Optional `Intl.DateTimeFormatOptions` overrides
 * @returns Readable date string
 * @example formatMillisToReadableDate(1705276800000) // "January 15, 2024"
 */
export function formatMillisToReadableDate(
  millis: number,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Date(millis).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}
