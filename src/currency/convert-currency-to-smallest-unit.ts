import { getCurrencyFractionDigits } from "./get-currency-fraction-digits.js";

/**
 * Main units to minor units — naira to kobo, dollars to cents — rounded to a whole
 * number, because a minor unit is by definition indivisible.
 *
 * @example convertCurrencyToSmallestUnit(12.5) // 1250
 * @example convertCurrencyToSmallestUnit(12.5, "JPY") // 13
 */
export function convertCurrencyToSmallestUnit(amount: number, currency?: string): number {
  const multiplier = 10 ** (currency ? getCurrencyFractionDigits(currency) : 2);
  return Math.round(amount * multiplier);
}
