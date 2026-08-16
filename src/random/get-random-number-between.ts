/**
 * A random integer between `min` and `max`, both inclusive. `Math.random`-based — for
 * presentation, not security.
 *
 * @example getRandomNumberBetween(1, 6) // 4
 */
export function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
