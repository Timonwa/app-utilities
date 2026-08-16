/**
 * Checks whether a value is a valid non-negative milliseconds timestamp.
 * @param value - Value to check
 * @returns True if value is a finite non-negative number
 * @example isValidMillis(1705276800000) // true
 */
export function isValidMillis(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value) && isFinite(value) && value >= 0;
}
