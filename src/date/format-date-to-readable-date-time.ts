/**
 * A localized long date with the time — "January 15, 2024, 3:30 PM".
 *
 * @example formatDateToReadableDateTime(new Date(2024, 0, 15, 15, 30)) // "January 15, 2024 at 3:30 PM"
 */
export function formatDateToReadableDateTime(date: Date, locale?: string): string {
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
