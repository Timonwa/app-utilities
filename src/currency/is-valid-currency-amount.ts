/**
 * Whether a value is a finite, non-negative number — the minimum bar for an amount of
 * money a form should accept.
 *
 * @example isValidCurrencyAmount(-1) // false
 * @example isValidCurrencyAmount(12.5) // true
 */
export function isValidCurrencyAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount >= 0;
}
