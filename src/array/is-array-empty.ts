import { toArrayView } from "./_shared.js";

/** @example isArrayEmpty([]) // true */
export function isArrayEmpty<T>(array: T[]): boolean {
  return toArrayView(array).length === 0;
}
