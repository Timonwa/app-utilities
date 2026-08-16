import { toArrayView } from "./_shared.js";

/**
 * Checks whether the array contains the given value.
 *
 * @example hasArrayItem([1, 2, 3], 2) // true
 */
export function hasArrayItem<T>(array: T[], value: T): boolean {
  return toArrayView(array).includes(value);
}
