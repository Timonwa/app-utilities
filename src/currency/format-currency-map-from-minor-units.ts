import { formatCurrencyFromMinorUnit } from "./format-currency-from-minor-unit.js";

/**
 * Formats a currency-code → minor-unit-amount map as display strings, sorted by
 * descending amount — for a stat card showing revenue across currencies. Zero-valued
 * currencies are dropped by default, because an empty line earns no place on a card.
 *
 * @example formatCurrencyMapFromMinorUnits({ NGN: 12_000_000, USD: 4500 })
 * // ["₦120,000.00", "$45.00"]
 */
export function formatCurrencyMapFromMinorUnits(
  values: Record<string, number>,
  options: { locale?: string; hideZero?: boolean } = {},
): string[] {
  const hideZero = options.hideZero ?? true;
  return Object.entries(values)
    .filter(([, amount]) => (hideZero ? amount > 0 : true))
    .sort(([, a], [, b]) => b - a)
    .map(([currency, amount]) =>
      formatCurrencyFromMinorUnit(amount, currency, { locale: options.locale }),
    );
}
