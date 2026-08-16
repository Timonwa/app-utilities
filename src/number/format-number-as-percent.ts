/**
 * Formats a 0-1 number as a percentage string.
 * @param num - Value (0-1 range)
 * @param decimals - Decimal places
 * @returns Percentage string
 * @example formatNumberAsPercent(0.123) // "12.3%"
 */
export function formatNumberAsPercent(num: number, decimals: number = 1): string {
  return typeof num === "number" ? `${(num * 100).toFixed(decimals)}%` : "";
}
