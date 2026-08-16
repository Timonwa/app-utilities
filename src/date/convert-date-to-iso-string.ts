/**
 * Converts a Date object to a full ISO 8601 string.
 * @param date - Date to convert
 * @returns ISO 8601 string
 * @example convertDateToISOString(new Date()) // "2024-01-15T10:30:00.000Z"
 */
export function convertDateToISOString(date: Date): string {
  return date.toISOString();
}
