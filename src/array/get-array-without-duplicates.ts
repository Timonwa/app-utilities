import { toArrayView } from "./_shared.js";

/**
 * Removes duplicate values, keeping the first occurrence of each.
 *
 * @example getArrayWithoutDuplicates([1, 2, 2, 3]) // [1, 2, 3]
 */
export function getArrayWithoutDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(toArrayView(array)));
}
