import { compareSortableValues, toArrayCopy } from "./_shared.js";

/**
 * Sorts by one key. Numbers and dates compare numerically; everything else compares
 * as a string through a collator, so "item 10" follows "item 9".
 *
 * @example getArraySortedByKey([{ age: 30 }, { age: 20 }], "age") // [{ age: 20 }, { age: 30 }]
 */
export function getArraySortedByKey<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] {
  const sorted = toArrayCopy(array);
  if (sorted.length < 2 || key == null) return sorted;

  return sorted.sort((a, b) => {
    const comparison = compareSortableValues(a[key], b[key]);
    return order === "desc" ? -comparison : comparison;
  });
}
