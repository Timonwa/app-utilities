/**
 * Rounds a main-unit amount to a currency-sensible number of decimals — the half-up
 * rounding a customer expects on a receipt.
 *
 * @example getRoundedCurrencyAmount(12.3456) // 12.35
 * @example getRoundedCurrencyAmount(12.3456, 0) // 12
 */
export function getRoundedCurrencyAmount(amount: number, fractionDigits = 2): number {
  const factor = 10 ** fractionDigits;
  return Math.round(amount * factor) / factor;
}
