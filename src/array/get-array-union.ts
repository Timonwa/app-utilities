import { toArrayView } from "./_shared.js";
import { getArrayWithoutDuplicates } from "./get-array-without-duplicates.js";

/** @example getArrayUnion([1, 2], [2, 3]) // [1, 2, 3] */
export function getArrayUnion<T>(first: T[], second: T[]): T[] {
  return getArrayWithoutDuplicates([...toArrayView(first), ...toArrayView(second)]);
}
