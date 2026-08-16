import { toArrayView } from "./_shared.js";

/**
 * Returns the first item of the array, or undefined when it is empty.
 *
 * @example getFirstArrayItem([1, 2, 3]) // 1
 */
export function getFirstArrayItem<T>(array: T[]): T | undefined {
  return toArrayView(array)[0];
}
