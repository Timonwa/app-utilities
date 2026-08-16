/**
 * Checks whether a date is strictly in the past.
 * @param date - Date to check
 * @returns True if date is before now
 * @example isDateInPast(new Date("2020-01-01")) // true
 */
export function isDateInPast(date: Date): boolean {
  return date < new Date();
}
