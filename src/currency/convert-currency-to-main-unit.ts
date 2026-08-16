import { getCurrencyFractionDigits } from "./get-currency-fraction-digits.js";

/**
 * Minor units to main units — kobo to naira, cents to dollars. Pass the currency so the
 * right divisor is used: 100 for NGN, 1 for JPY, 1000 for KWD. Without one it assumes
 * the common two-decimal case.
 *
 * @example convertCurrencyToMainUnit(1250) // 12.5
 * @example convertCurrencyToMainUnit(1250, "JPY") // 1250
 */
export function convertCurrencyToMainUnit(amount: number, currency?: string): number {
  const divisor = 10 ** (currency ? getCurrencyFractionDigits(currency) : 2);
  return amount / divisor;
}
