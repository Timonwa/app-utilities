/**
 * Returns the start of the given month (first day at 00:00:00.000).
 * @param date - Source date
 * @returns Date at start of that month
 * @example getStartOfMonth(new Date("2024-01-15")) // 2024-01-01T00:00:00.000
 */
export function getStartOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}
