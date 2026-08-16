import { toArrayView } from "./_shared.js";

/**
 * Returns the items of the first array that are not present in the second.
 *
 * @example getArrayDifference([1, 2, 3], [2, 4]) // [1, 3]
 */
export function getArrayDifference<T>(array: T[], exclude: T[]): T[] {
  const source = toArrayView(array);
  if (source.length === 0) return [];

  const excluded = new Set(toArrayView(exclude));
  return source.filter((item) => !excluded.has(item));
}
