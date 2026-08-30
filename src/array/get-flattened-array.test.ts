import { describe, expect, it } from "vitest";
import { getFlattenedArray } from "./index.js";

describe("getFlattenedArray", () => {
  it("flattens one level and drops non-arrays", () => {
    expect(getFlattenedArray([[1, 2], [3]])).toEqual([1, 2, 3]);
    expect(getFlattenedArray([[1], null, undefined, [2]])).toEqual([1, 2]);
  });

  it("flattens exactly one level, leaving deeper nesting intact", () => {
    expect(getFlattenedArray([[1, [2]], [3]])).toEqual([1, [2], 3]);
  });

  it("returns empty when every inner array is empty", () => {
    expect(getFlattenedArray([[], [], []])).toEqual([]);
    expect(getFlattenedArray([])).toEqual([]);
  });
});
