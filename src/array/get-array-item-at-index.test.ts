import { describe, expect, it } from "vitest";
import { getArrayItemAtIndex } from "./index.js";

describe("getArrayItemAtIndex", () => {
  it("supports negative indices and rejects nonsense ones", () => {
    expect(getArrayItemAtIndex([10, 20, 30], 1)).toBe(20);
    expect(getArrayItemAtIndex([10, 20, 30], -1)).toBe(30);
    expect(getArrayItemAtIndex([10, 20, 30], Number.NaN)).toBeUndefined();
    expect(getArrayItemAtIndex([10, 20, 30], 9)).toBeUndefined();
  });

  it("truncates fractional indexes towards zero", () => {
    expect(getArrayItemAtIndex([10, 20, 30], 1.9)).toBe(20);
    // Math.trunc(-1.9) is -1, so this reads the last item, not the second-last.
    expect(getArrayItemAtIndex([10, 20, 30], -1.9)).toBe(30);
  });

  it("returns undefined for a negative index past the start", () => {
    expect(getArrayItemAtIndex([10, 20, 30], -4)).toBeUndefined();
    expect(getArrayItemAtIndex([], 0)).toBeUndefined();
  });
});
