/**
 * Checks whether a value is a finite number (excludes NaN/Infinity).
 * @param value - Value to check
 * @returns True if value is a finite number
 * @example isNumber(NaN) // false
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value) && Number.isFinite(value);
}
