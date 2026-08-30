import { describe, expect, it } from "vitest";
import { isNumberNegative } from "./index.js";

describe("isNumberNegative", () => {
  it("returns true below zero", () => {
    expect(isNumberNegative(-5)).toBe(true);
    expect(isNumberNegative(-0.001)).toBe(true);
  });

  it("returns false for zero and positives", () => {
    expect(isNumberNegative(0)).toBe(false);
    expect(isNumberNegative(5)).toBe(false);
  });
});
