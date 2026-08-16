/**
 * Formats a number with a fixed number of decimal places.
 * @param num - Number to format
 * @param decimals - Decimal places
 * @returns Fixed-decimal string
 * @example formatNumberToDecimal(3.14159, 2) // "3.14"
 */
export function formatNumberToDecimal(num: number, decimals: number): string {
  return num.toFixed(decimals);
}
