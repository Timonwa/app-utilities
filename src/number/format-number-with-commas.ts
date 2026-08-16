/**
 * Formats a number with commas and N decimal places.
 * @param num - Number to format
 * @param decimals - Decimal places
 * @returns Comma-separated string
 * @example formatNumberWithCommas(1234567.891, 2) // "1,234,567.89"
 */
export function formatNumberWithCommas(num: number, decimals: number = 0): string {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
