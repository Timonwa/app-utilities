import { getCurrencyTaxAmount } from "./get-currency-tax-amount.js";

/**
 * A price with tax added.
 *
 * @example getCurrencyAmountWithTax(100, 7.5) // 107.5
 */
export function getCurrencyAmountWithTax(price: number, taxRate: number): number {
  return price + getCurrencyTaxAmount(price, taxRate);
}
