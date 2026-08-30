import { describe, expect, it } from "vitest";
import { isNumber, isNumberInRange } from "./index.js";

describe("validators", () => {
  it("isNumber rejects NaN and Infinity", () => {
    expect(isNumber(1.5)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isNumberInRange(5, 1, 10)).toBe(true);
  });

  it("is a type guard, not a coercion — numeric strings fail", () => {
    expect(isNumber("5")).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });

  it("accepts zero and negatives", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-12.5)).toBe(true);
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(false);
  });
});
