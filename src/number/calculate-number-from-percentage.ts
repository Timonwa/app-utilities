/**
 * Returns the value of a percentage of a total.
 * @param percentage - Percentage value (0-100)
 * @param total - Total value
 * @returns Calculated portion
 * @example calculateNumberFromPercentage(25, 100) // 25
 */
export function calculateNumberFromPercentage(percentage: number, total: number): number {
  return (percentage / 100) * total;
}
