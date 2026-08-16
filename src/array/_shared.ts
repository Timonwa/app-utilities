/** One collator, reused. `localeCompare` builds a new one on every call, which is the
 *  expensive part — and a comparator calls it O(n log n) times. */
export const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

/** Copies, so callers can sort or shuffle the result without touching the original. */
export function toArrayCopy<T>(value: readonly T[] | null | undefined): T[] {
  return Array.isArray(value) ? [...value] : [];
}

/** Read-only view — no copy, because nothing downstream mutates it. */
export function toArrayView<T>(value: readonly T[] | null | undefined): readonly T[] {
  return Array.isArray(value) ? value : [];
}

export function compareSortableValues(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  // `numeric: true` means "item 10" sorts after "item 9", not before it.
  return collator.compare(String(a ?? ""), String(b ?? ""));
}
