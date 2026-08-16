import { toArrayView } from "./_shared.js";

/**
 * Flattens one level, dropping anything that is not an array.
 *
 * @example getFlattenedArray([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 */
export function getFlattenedArray<T>(array: (T[] | null | undefined)[]): T[] {
  return toArrayView(array).flatMap((item) => (Array.isArray(item) ? item : []));
}
