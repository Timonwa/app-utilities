import { toArrayView } from "./_shared.js";

/**
 * Case-insensitive "contains" across the given fields.
 *
 * An empty search term returns everything — a search box the user has not typed in
 * yet should show the list, not hide it.
 *
 * @example getArrayItemsBySearchTerm([{ name: "Alice" }], "ali", ["name"]) // [{ name: "Alice" }]
 */
export function getArrayItemsBySearchTerm<T extends Record<string, unknown>>(
  array: T[],
  searchTerm: string,
  fields: (keyof T)[],
): T[] {
  const source = toArrayView(array);
  if (source.length === 0) return [];

  const term = String(searchTerm ?? "")
    .trim()
    .toLowerCase();
  if (!term) return [...source];

  const searchable = toArrayView(fields);
  if (searchable.length === 0) return [];

  return source.filter((item) =>
    searchable.some((field) =>
      String(item[field] ?? "")
        .toLowerCase()
        .includes(term),
    ),
  );
}
