/**
 * Returns the start of the given day (00:00:00.000).
 * @param date - Source date
 * @returns Date at start of that day
 * @example getStartOfDay(new Date("2024-01-15T15:30:00")) // 2024-01-15T00:00:00.000
 */
export function getStartOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}
