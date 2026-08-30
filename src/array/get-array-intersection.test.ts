import { describe, expect, it } from "vitest";
import { getArrayIntersection } from "./index.js";

describe("getArrayIntersection", () => {
  it("completes the set trio", () => {
    expect(getArrayIntersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(getArrayIntersection([1, 1, 2], [1])).toEqual([1]);
    expect(getArrayIntersection([1], [])).toEqual([]);
  });

  it("keeps the first array's order, not the second's", () => {
    expect(getArrayIntersection([3, 1, 2], [2, 3])).toEqual([3, 2]);
  });

  it("compares objects by reference, not shape", () => {
    const shared = { a: 1 };
    expect(getArrayIntersection([shared, { a: 2 }], [shared])).toEqual([shared]);
    expect(getArrayIntersection([{ a: 1 }], [{ a: 1 }])).toEqual([]);
  });

  it("returns empty for disjoint arrays", () => {
    expect(getArrayIntersection([1, 2], [3, 4])).toEqual([]);
  });
});
