/**
 * Formats an ISO string to a readable date.
 * @param isoString - ISO date string
 * @param locale - Locale string for formatting
 * @param options - Optional `Intl.DateTimeFormatOptions` overrides
 * @returns Readable date string
 * @example formatISOToReadableDate("2024-01-15T10:30:00.000Z") // "January 15, 2024"
 */
export function formatISOToReadableDate(
  isoString: string,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(isoString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}
