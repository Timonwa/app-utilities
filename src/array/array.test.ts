import { describe, expect, it } from "vitest";
import {
  getArrayChunks,
  getArrayDifference,
  getArrayIntersection,
  getArrayItemAtIndex,
  getArrayItemById,
  getArrayItemsBySearchTerm,
  getArraySortedByKey,
  getArrayUnion,
  getArrayWithoutDuplicates,
  getFirstArrayItem,
  getFlattenedArray,
  getLastArrayItem,
  getShuffledArray,
  groupArrayByConsecutiveKey,
  hasArrayItem,
  isArrayEmpty,
  rankByTiers,
} from "./index.js";

describe("null tolerance", () => {
  // Every function takes the same defensive path, so this covers the contract once.
  it("treats null and undefined as empty", () => {
    const nothing = null as unknown as number[];
    expect(getArrayDifference(nothing, [1])).toEqual([]);
    expect(getArrayUnion(nothing, [1])).toEqual([1]);
    expect(getArrayWithoutDuplicates(nothing)).toEqual([]);
    expect(getArrayChunks(nothing, 2)).toEqual([]);
    expect(getFirstArrayItem(nothing)).toBeUndefined();
    expect(getLastArrayItem(nothing)).toBeUndefined();
    expect(isArrayEmpty(nothing)).toBe(true);
    expect(hasArrayItem(nothing, 1)).toBe(false);
  });
});

describe("no function mutates its input", () => {
  it("leaves the original alone", () => {
    const source = [3, 1, 2];
    getShuffledArray(source);
    expect(source).toEqual([3, 1, 2]);

    const objects = [{ n: 3 }, { n: 1 }];
    getArraySortedByKey(objects, "n");
    expect(objects).toEqual([{ n: 3 }, { n: 1 }]);
  });
});

describe("getArrayChunks", () => {
  it("splits into chunks, last one short", () => {
    expect(getArrayChunks([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  // A size of 0 in a `for (i += size)` loop never terminates.
  it("falls back to one chunk for a size that cannot work", () => {
    expect(getArrayChunks([1, 2, 3], 0)).toEqual([[1, 2, 3]]);
    expect(getArrayChunks([1, 2, 3], -1)).toEqual([[1, 2, 3]]);
    expect(getArrayChunks([1, 2, 3], Number.NaN)).toEqual([[1, 2, 3]]);
  });
});

describe("getArraySortedByKey", () => {
  it("sorts numbers numerically, both directions", () => {
    expect(getArraySortedByKey([{ n: 30 }, { n: 20 }], "n")).toEqual([
      { n: 20 },
      { n: 30 },
    ]);
    expect(getArraySortedByKey([{ n: 20 }, { n: 30 }], "n", "desc")).toEqual([
      { n: 30 },
      { n: 20 },
    ]);
  });

  it("sorts embedded numbers naturally, not lexically", () => {
    const sorted = getArraySortedByKey(
      [{ t: "item 10" }, { t: "item 9" }, { t: "item 1" }],
      "t",
    );
    // A plain string sort puts "item 10" before "item 9".
    expect(sorted.map((x) => x.t)).toEqual(["item 1", "item 9", "item 10"]);
  });

  it("sorts dates chronologically", () => {
    const sorted = getArraySortedByKey(
      [{ d: new Date("2026-03-01") }, { d: new Date("2026-01-01") }],
      "d",
    );
    expect(sorted[0]?.d.getMonth()).toBe(0);
  });
});

describe("getFlattenedArray", () => {
  it("flattens one level and drops non-arrays", () => {
    expect(getFlattenedArray([[1, 2], [3]])).toEqual([1, 2, 3]);
    expect(getFlattenedArray([[1], null, undefined, [2]])).toEqual([1, 2]);
  });
});

describe("groupArrayByConsecutiveKey", () => {
  it("groups adjacent runs and keeps non-adjacent ones separate", () => {
    const grouped = groupArrayByConsecutiveKey(
      [{ c: "a" }, { c: "a" }, { c: "b" }, { c: "a" }],
      (item) => item.c,
    );
    expect(grouped.map((g) => `${g.key}:${g.items.length}`)).toEqual([
      "a:2",
      "b:1",
      "a:1",
    ]);
  });
});

describe("rankByTiers", () => {
  it("ranks by the first matching predicate, unmatched last", () => {
    const rank = rankByTiers<{ state: string }>([
      (item) => item.state === "live",
      (item) => item.state === "upcoming",
    ]);
    expect(rank({ state: "live" })).toBe(0);
    expect(rank({ state: "upcoming" })).toBe(1);
    expect(rank({ state: "ended" })).toBe(2);
  });
});

describe("getArrayItemsBySearchTerm", () => {
  const people = [{ name: "Alice" }, { name: "Bob" }];

  it("matches case-insensitively on the given fields", () => {
    expect(getArrayItemsBySearchTerm(people, "ali", ["name"])).toEqual([
      { name: "Alice" },
    ]);
  });

  it("returns everything for an empty term, so an untouched search box shows the list", () => {
    expect(getArrayItemsBySearchTerm(people, "   ", ["name"])).toEqual(people);
  });

  it("returns nothing when there are no fields to search", () => {
    expect(getArrayItemsBySearchTerm(people, "ali", [])).toEqual([]);
  });
});

describe("single-item access", () => {
  it("supports negative indices and rejects nonsense ones", () => {
    expect(getArrayItemAtIndex([10, 20, 30], 1)).toBe(20);
    expect(getArrayItemAtIndex([10, 20, 30], -1)).toBe(30);
    expect(getArrayItemAtIndex([10, 20, 30], Number.NaN)).toBeUndefined();
    expect(getArrayItemAtIndex([10, 20, 30], 9)).toBeUndefined();
  });

  it("finds by id", () => {
    expect(getArrayItemById([{ id: 1 }, { id: 2 }], 2)).toEqual({ id: 2 });
    expect(getArrayItemById([{ id: "a" }], "b")).toBeUndefined();
  });
});

describe("set operations", () => {
  it("difference and union deduplicate", () => {
    expect(getArrayDifference([1, 2, 3], [2, 4])).toEqual([1, 3]);
    expect(getArrayUnion([1, 2], [2, 3])).toEqual([1, 2, 3]);
    expect(getArrayWithoutDuplicates([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  // Documented limitation: identity, not structural equality.
  it("compares objects by reference", () => {
    expect(getArrayWithoutDuplicates([{ a: 1 }, { a: 1 }])).toHaveLength(2);
  });
});

describe("getArrayIntersection", () => {
  it("completes the set trio", () => {
    expect(getArrayIntersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(getArrayIntersection([1, 1, 2], [1])).toEqual([1]);
    expect(getArrayIntersection([1], [])).toEqual([]);
  });
});
