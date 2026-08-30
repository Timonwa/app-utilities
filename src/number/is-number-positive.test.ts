import { describe, expect, it } from "vitest";
import { isNumberPositive } from "./index.js";

describe("isNumberPositive", () => {
  it("returns true above zero", () => {
    expect(isNumberPositive(5)).toBe(true);
    expect(isNumberPositive(0.001)).toBe(true);
  });

  it("returns false for zero and negatives", () => {
    expect(isNumberPositive(0)).toBe(false);
    expect(isNumberPositive(-5)).toBe(false);
  });
});
