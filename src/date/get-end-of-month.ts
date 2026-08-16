/**
 * Returns the end of the given month (last day at 23:59:59.999).
 * @param date - Source date
 * @returns Date at end of that month
 * @example getEndOfMonth(new Date("2024-01-15")) // 2024-01-31T23:59:59.999
 */
export function getEndOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
}
