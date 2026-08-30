import { describe, expect, it } from "vitest";
import { getArrayWithoutDuplicates } from "./index.js";

describe("getArrayWithoutDuplicates", () => {
  // Documented limitation: identity, not structural equality.
  it("compares objects by reference", () => {
    expect(getArrayWithoutDuplicates([{ a: 1 }, { a: 1 }])).toHaveLength(2);
  });

  it("keeps the first occurrence of each value, in order", () => {
    expect(getArrayWithoutDuplicates([3, 1, 3, 2, 1])).toEqual([3, 1, 2]);
  });

  it("deduplicates NaN, unlike === would suggest", () => {
    // Set uses SameValueZero, so NaN equals itself here.
    expect(getArrayWithoutDuplicates([Number.NaN, Number.NaN])).toEqual([Number.NaN]);
  });

  it("leaves an already-unique array as is", () => {
    expect(getArrayWithoutDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
    expect(getArrayWithoutDuplicates([])).toEqual([]);
  });
});
