/**
 * A localized long date — "January 15, 2024". Pass Intl options to adjust.
 *
 * @example formatDateToReadableDate(new Date(2024, 0, 15)) // "January 15, 2024"
 */
export function formatDateToReadableDate(
  date: Date,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}
