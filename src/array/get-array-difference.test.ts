import { describe, expect, it } from "vitest";
import { getArrayDifference, getArrayUnion, getArrayWithoutDuplicates } from "./index.js";

describe("set operations", () => {
  it("difference and union deduplicate", () => {
    expect(getArrayDifference([1, 2, 3], [2, 4])).toEqual([1, 3]);
    expect(getArrayUnion([1, 2], [2, 3])).toEqual([1, 2, 3]);
    expect(getArrayWithoutDuplicates([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe("getArrayDifference", () => {
  it("keeps the source's duplicates and order", () => {
    // Difference filters the first array; it never deduplicates it.
    expect(getArrayDifference([3, 1, 1, 2], [2])).toEqual([3, 1, 1]);
  });

  it("compares objects by reference, not shape", () => {
    const shared = { a: 1 };
    expect(getArrayDifference([shared, { a: 2 }], [shared])).toEqual([{ a: 2 }]);
    expect(getArrayDifference([{ a: 1 }], [{ a: 1 }])).toEqual([{ a: 1 }]);
  });

  it("returns everything when nothing overlaps with the exclusions", () => {
    expect(getArrayDifference([1, 2], [])).toEqual([1, 2]);
    expect(getArrayDifference([1, 2], [3, 4])).toEqual([1, 2]);
  });
});

describe("getArrayUnion", () => {
  it("keeps first-seen order across both arrays", () => {
    expect(getArrayUnion([2, 1], [1, 3, 2])).toEqual([2, 1, 3]);
  });

  it("works when either side is empty", () => {
    expect(getArrayUnion([], [1, 2])).toEqual([1, 2]);
    expect(getArrayUnion([1, 2], [])).toEqual([1, 2]);
  });
});
