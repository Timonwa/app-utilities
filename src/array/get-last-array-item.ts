import { toArrayView } from "./_shared.js";

/**
 * Returns the last item of the array, or undefined when it is empty.
 *
 * @example getLastArrayItem([1, 2, 3]) // 3
 */
export function getLastArrayItem<T>(array: T[]): T | undefined {
  return toArrayView(array).at(-1);
}
