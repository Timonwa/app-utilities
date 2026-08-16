import { getCurrencyDiscountAmount } from "./get-currency-discount-amount.js";

/**
 * What remains after a percentage discount.
 *
 * @example getCurrencyAmountAfterDiscount(100, 20) // 80
 */
export function getCurrencyAmountAfterDiscount(
  originalPrice: number,
  discountPercentage: number,
): number {
  return originalPrice - getCurrencyDiscountAmount(originalPrice, discountPercentage);
}
