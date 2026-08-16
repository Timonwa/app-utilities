/**
 * Builds a comparator-friendly rank from an ordered list of predicates — the index of
 * the first one that matches, or `tiers.length` for no match. Sort by the result to
 * order items into bands (live, then upcoming, then ended) without a nested ternary.
 *
 * @example
 * const rank = rankByTiers<Item>([(i) => i.isLive, (i) => i.isUpcoming]);
 * items.sort((a, b) => rank(a) - rank(b));
 */
export function rankByTiers<T>(tiers: Array<(item: T) => boolean>): (item: T) => number {
  return (item) => {
    const index = tiers.findIndex((matches) => matches(item));
    return index === -1 ? tiers.length : index;
  };
}
