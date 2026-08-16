/**
 * Checks whether a date is strictly in the future.
 * @param date - Date to check
 * @returns True if date is after now
 * @example isDateInFuture(new Date("2030-01-01")) // true
 */
export function isDateInFuture(date: Date): boolean {
  return date > new Date();
}
