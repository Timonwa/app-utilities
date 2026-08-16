import { toArrayView } from "./_shared.js";

/** @example getArrayItemAtIndex([10, 20, 30], -1) // 30 */
export function getArrayItemAtIndex<T>(array: T[], index: number): T | undefined {
  if (!Number.isFinite(index)) return undefined;
  return toArrayView(array).at(Math.trunc(index));
}
