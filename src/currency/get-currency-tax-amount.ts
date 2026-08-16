/**
 * The tax portion of a price, given a rate.
 *
 * @example getCurrencyTaxAmount(100, 7.5) // 7.5
 */
export function getCurrencyTaxAmount(price: number, taxRate: number): number {
  return (price * taxRate) / 100;
}
