/**
 * The discount portion of a price, given a percentage.
 *
 * @example getCurrencyDiscountAmount(100, 20) // 20
 */
export function getCurrencyDiscountAmount(
  originalPrice: number,
  discountPercentage: number,
): number {
  return (originalPrice * discountPercentage) / 100;
}
