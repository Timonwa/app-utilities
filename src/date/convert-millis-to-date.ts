/**
 * Converts milliseconds to a Date object.
 * @param millis - Unix milliseconds
 * @returns Date
 * @example convertMillisToDate(1705276800000) // Date for 2024-01-15
 */
export function convertMillisToDate(millis: number): Date {
  return new Date(millis);
}
