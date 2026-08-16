import { toArrayView } from "./_shared.js";

/**
 * Values present in both arrays — completes the set trio with `getArrayDifference` and
 * `getArrayUnion`. Identity comparison, deduplicated, first array's order.
 *
 * @example getArrayIntersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export function getArrayIntersection<T>(first: T[], second: T[]): T[] {
  const source = toArrayView(first);
  if (source.length === 0) return [];

  const other = new Set(toArrayView(second));
  return [...new Set(source.filter((item) => other.has(item)))];
}
