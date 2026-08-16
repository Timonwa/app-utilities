/**
 * Checks whether a string is a valid YYYY-MM-DD ISO date.
 * @param str - String to validate
 * @returns True if string is a parseable YYYY-MM-DD
 * @example isValidISODate("2024-01-15") // true
 */
export function isValidISODate(str: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(str)) return false;
  const date = new Date(str);
  return !isNaN(date.getTime());
}
