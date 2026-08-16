/**
 * Checks whether a number is within an inclusive range.
 * @param num - Number to check
 * @param min - Lower bound (inclusive)
 * @param max - Upper bound (inclusive)
 * @returns True if in range
 * @example isNumberInRange(5, 1, 10) // true
 */
export function isNumberInRange(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}
