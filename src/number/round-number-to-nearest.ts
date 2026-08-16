/**
 * Rounds a number to the nearest increment.
 * @param num - Number to round
 * @param nearest - Increment
 * @returns Rounded number
 * @example roundNumberToNearest(23, 5) // 25
 */
export function roundNumberToNearest(num: number, nearest: number): number {
  return Math.round(num / nearest) * nearest;
}
