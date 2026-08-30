import { describe, expect, it } from "vitest";
import { isNumberEven } from "./index.js";

describe("isNumberEven", () => {
  it("returns true for even integers, including zero and negatives", () => {
    expect(isNumberEven(4)).toBe(true);
    expect(isNumberEven(0)).toBe(true);
    expect(isNumberEven(-2)).toBe(true);
  });

  it("returns false for odd integers and fractions", () => {
    expect(isNumberEven(3)).toBe(false);
    expect(isNumberEven(2.5)).toBe(false);
  });
});
