/**
 * Clamps a number between minimum and maximum values.
 * @param num - Number to clamp
 * @param min - Lower bound (inclusive)
 * @param max - Upper bound (inclusive)
 * @returns Clamped number
 * @example clampNumber(15, 0, 10) // 10
 */
export function clampNumber(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
