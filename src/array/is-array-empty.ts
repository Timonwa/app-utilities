import { toArrayView } from "./_shared.js";

/**
 * Checks whether the array has no items.
 *
 * @example isArrayEmpty([]) // true
 */
export function isArrayEmpty<T>(array: T[]): boolean {
  return toArrayView(array).length === 0;
}
