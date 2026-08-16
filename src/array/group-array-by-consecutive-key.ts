import { toArrayView } from "./_shared.js";

/**
 * Groups runs of adjacent items sharing a key, preserving order. Non-adjacent runs
 * stay separate — the point is to group a sorted list into visual sections, so
 * merging them would misrepresent the order.
 *
 * @example groupArrayByConsecutiveKey([{c:"a"},{c:"a"},{c:"b"}], (x) => x.c)
 * // [{ key: "a", items: [{c:"a"},{c:"a"}] }, { key: "b", items: [{c:"b"}] }]
 */
export function groupArrayByConsecutiveKey<T>(
  array: T[],
  getKey: (item: T) => string,
): Array<{ key: string; items: T[] }> {
  const groups: Array<{ key: string; items: T[] }> = [];

  for (const item of toArrayView(array)) {
    const key = getKey(item);
    const last = groups[groups.length - 1];

    if (last && last.key === key) last.items.push(item);
    else groups.push({ key, items: [item] });
  }
  return groups;
}
