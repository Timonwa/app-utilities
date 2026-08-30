import { describe, expect, it } from "vitest";
import { getArrayUnion } from "./index.js";

describe("getArrayUnion", () => {
  it("merges both arrays and drops duplicates", () => {
    expect(getArrayUnion([1, 2], [2, 3])).toEqual([1, 2, 3]);
  });

  it("keeps first-seen order across the two inputs", () => {
    expect(getArrayUnion(["b", "a"], ["c", "a", "b"])).toEqual(["b", "a", "c"]);
  });

  it("also drops duplicates that were already inside one input", () => {
    expect(getArrayUnion([1, 1, 2], [2, 2])).toEqual([1, 2]);
  });

  it("handles empty inputs on either side", () => {
    expect(getArrayUnion([], [1])).toEqual([1]);
    expect(getArrayUnion([1], [])).toEqual([1]);
    expect(getArrayUnion([], [])).toEqual([]);
  });

  it("does not mutate either input", () => {
    const first = [1, 2];
    const second = [2, 3];
    getArrayUnion(first, second);
    expect(first).toEqual([1, 2]);
    expect(second).toEqual([2, 3]);
  });
});
