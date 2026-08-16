/**
 * A localized numeric date — "1/15/24" in en-US, "15/01/24" in en-GB. Locale-aware on
 * purpose: the old hardcoded MM/DD/YYYY showed US ordering to everyone.
 *
 * @example formatDateToShortDate(new Date(2024, 0, 15), "en-US") // "1/15/24"
 */
export function formatDateToShortDate(date: Date, locale?: string): string {
  return date.toLocaleDateString(locale, {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });
}
