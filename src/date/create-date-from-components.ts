/**
 * Creates a Date from year, month (1-indexed), and day.
 * @param year - Full year
 * @param month - Month (1-12)
 * @param day - Day of month
 * @returns New Date
 * @example createDateFromComponents(2024, 1, 15) // Date for January 15, 2024
 */
export function createDateFromComponents(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}
