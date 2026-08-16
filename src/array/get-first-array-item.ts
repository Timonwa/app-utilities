import { toArrayView } from "./_shared.js";

/** @example getFirstArrayItem([1, 2, 3]) // 1 */
export function getFirstArrayItem<T>(array: T[]): T | undefined {
  return toArrayView(array)[0];
}
