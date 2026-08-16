import { parseCurrencyString } from "./parse-currency-string.js";

/**
 * Whether a string parses to a valid non-negative amount.
 *
 * @example isValidCurrencyString("₦1,200.50") // true
 * @example isValidCurrencyString("free") // false
 */
export function isValidCurrencyString(value: string): boolean {
  const parsed = parseCurrencyString(value);
  return parsed !== null && parsed >= 0;
}
