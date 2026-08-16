import { toArrayView } from "./_shared.js";

/** @example hasArrayItem([1, 2, 3], 2) // true */
export function hasArrayItem<T>(array: T[], value: T): boolean {
  return toArrayView(array).includes(value);
}
