/**
 * Converts a Date to milliseconds since epoch.
 * @param date - Source Date
 * @returns Unix milliseconds
 * @example convertDateToMillis(new Date("2024-01-15")) // 1705276800000
 */
export function convertDateToMillis(date: Date): number {
  return date.getTime();
}
