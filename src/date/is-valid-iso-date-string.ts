/**
 * Checks whether a string is a valid ISO 8601 date-time string.
 * @param str - String to validate
 * @returns True if string is a parseable ISO date-time
 * @example isValidISODateString("2024-01-15T10:30:00.000Z") // true
 */
export function isValidISODateString(str: string): boolean {
  const date = new Date(str);
  return !Number.isNaN(date.getTime()) && str.includes("T");
}
