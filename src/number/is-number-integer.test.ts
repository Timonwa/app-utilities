import { describe, expect, it } from "vitest";
import { isNumberInteger } from "./index.js";

describe("isNumberInteger", () => {
  it("returns true for whole numbers, including zero and negatives", () => {
    expect(isNumberInteger(5)).toBe(true);
    expect(isNumberInteger(0)).toBe(true);
    expect(isNumberInteger(-12)).toBe(true);
  });

  it("returns false for fractions, NaN, and infinities", () => {
    expect(isNumberInteger(5.5)).toBe(false);
    expect(isNumberInteger(Number.NaN)).toBe(false);
    expect(isNumberInteger(Number.POSITIVE_INFINITY)).toBe(false);
  });
});
