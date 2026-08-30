import { describe, expect, it } from "vitest";
import { getArrayChunks } from "./index.js";

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

  it("returns one chunk when the size covers the whole array", () => {
    expect(getArrayChunks([1, 2], 2)).toEqual([[1, 2]]);
    expect(getArrayChunks([1, 2], 5)).toEqual([[1, 2]]);
  });

  it("floors a fractional size", () => {
    expect(getArrayChunks([1, 2, 3, 4], 2.9)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
