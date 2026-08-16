import { toArrayView } from "./_shared.js";

/** @example getArrayItemsByKeyValue([{ role: "admin" }, { role: "user" }], "role", "admin") // [{ role: "admin" }] */
export function getArrayItemsByKeyValue<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
  value: unknown,
): T[] {
  const source = toArrayView(array);
  if (source.length === 0 || key == null) return [];

  return source.filter((item) => item[key] === value);
}
