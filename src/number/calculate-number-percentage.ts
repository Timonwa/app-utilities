import { roundNumberToDecimal } from "./round-number-to-decimal.js";

/**
 * Returns the percentage of a value relative to a total, rounded to N decimals.
 * @param value - Value to convert
 * @param total - Total to compare against
 * @param decimals - Decimal places to round to
 * @returns Percentage value (0-100)
 * @example calculateNumberPercentage(1, 3) // 33.33
 */
export function calculateNumberPercentage(
  value: number,
  total: number,
  decimals: number = 2,
): number {
  if (total === 0) return 0;
  return roundNumberToDecimal((value / total) * 100, decimals);
}
