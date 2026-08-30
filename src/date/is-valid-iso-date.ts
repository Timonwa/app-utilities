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
  if (Number.isNaN(date.getTime())) return false;
  // V8 rolls overflowing days into the next month ("2024-02-31" → Mar 2), so
  // round-trip the parse (date-only strings parse as UTC) to catch them.
  return date.toISOString().slice(0, 10) === str;
}
