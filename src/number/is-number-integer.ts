/**
 * Checks whether a number is an integer.
 * @param num - Number to check
 * @returns True if integer
 * @example isNumberInteger(5.5) // false
 */
export function isNumberInteger(num: number): boolean {
  return Number.isInteger(num);
}
