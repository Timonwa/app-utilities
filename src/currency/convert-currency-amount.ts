/**
 * Multiplies an amount by an exchange rate. Nothing more — rate sourcing, spread, and
 * rounding policy are the app's.
 *
 * @example convertCurrencyAmount(100, 1.5) // 150
 */
export function convertCurrencyAmount(amount: number, exchangeRate: number): number {
  return amount * exchangeRate;
}
