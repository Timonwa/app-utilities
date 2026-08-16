/**
 * Gets the HH:MM:SS portion from a Date.
 * @param date - Source Date
 * @returns HH:MM:SS string
 * @example getTimeFromDate(new Date("2024-01-15T15:30:45")) // "15:30:45"
 */
export function getTimeFromDate(date: Date): string {
  return date.toTimeString().split(" ")[0]!;
}
