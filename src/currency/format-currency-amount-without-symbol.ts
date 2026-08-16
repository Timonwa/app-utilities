/**
 * Locale-aware thousands separators and fixed decimals, no symbol — for an input field
 * or a table column whose header already names the currency.
 *
 * @example formatCurrencyAmountWithoutSymbol(1234.5, "en-US") // "1,234.50"
 */
export function formatCurrencyAmountWithoutSymbol(
  amount: number,
  locale?: string,
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
