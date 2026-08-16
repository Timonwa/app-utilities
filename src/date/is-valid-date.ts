/**
 * Type guard for valid `Date` instances.
 * @param date - Value to check
 * @returns True if value is a valid Date
 * @example isValidDate(new Date("invalid")) // false
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !Number.isNaN(date.getTime());
}
