import { describe, expect, it } from "vitest";
import {
  getArrayChunks,
  getArrayDifference,
  getArraySortedByKey,
  getArrayUnion,
  getArrayWithoutDuplicates,
  getFirstArrayItem,
  getLastArrayItem,
  getShuffledArray,
  hasArrayItem,
  isArrayEmpty,
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
