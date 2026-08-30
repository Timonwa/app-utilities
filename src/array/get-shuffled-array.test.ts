import { afterEach, describe, expect, it, vi } from "vitest";
import { getShuffledArray } from "./index.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getShuffledArray", () => {
  it("returns the same elements, just reordered", () => {
    const source = [1, 2, 3, 4, 5];
    const shuffled = getShuffledArray(source);
    expect(shuffled).toHaveLength(5);
    expect([...shuffled].sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("does not mutate the input", () => {
    const source = [3, 1, 2];
    getShuffledArray(source);
    expect(source).toEqual([3, 1, 2]);
  });

  it("is deterministic under a pinned Math.random", () => {
    // Fisher-Yates with random always 0 swaps each position down into index 0.
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(getShuffledArray([1, 2, 3, 4])).toEqual([2, 3, 4, 1]);
  });

  it("handles empty and single-item arrays", () => {
    expect(getShuffledArray([])).toEqual([]);
    expect(getShuffledArray([7])).toEqual([7]);
  });
});
