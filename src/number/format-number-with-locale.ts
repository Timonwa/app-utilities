/**
 * Formats a number using locale-specific formatting.
 * @param num - Number to format
 * @param locale - Locale string for formatting
 * @param options - Optional `Intl.NumberFormatOptions` overrides
 * @returns Locale-formatted string
 * @example formatNumberWithLocale(1234567.89, "de-DE") // "1.234.567,89"
 */
export function formatNumberWithLocale(
  num: number,
  locale: string = "en-US",
  options?: Intl.NumberFormatOptions,
): string {
  return typeof num === "number" ? num.toLocaleString(locale, options) : "";
}
