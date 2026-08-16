/**
 * Returns the end of the given day (23:59:59.999).
 * @param date - Source date
 * @returns Date at end of that day
 * @example getEndOfDay(new Date("2024-01-15T15:30:00")) // 2024-01-15T23:59:59.999
 */
export function getEndOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}
