import { toArrayView } from "./_shared.js";

/** @example getArrayItemById([{ id: 1 }, { id: 2 }], 2) // { id: 2 } */
export function getArrayItemById<T extends { id: string | number }>(
  array: T[],
  id: string | number,
): T | undefined {
  if (id == null) return undefined;
  return toArrayView(array).find((item) => item.id === id);
}
