import { describe, expect, it } from "vitest";
import { isValidCurrencyAmount, isValidCurrencyString } from "./index.js";

describe("money maths", () => {
  it("validity checks", () => {
    expect(isValidCurrencyAmount(-1)).toBe(false);
    expect(isValidCurrencyAmount(12.5)).toBe(true);
    expect(isValidCurrencyString("₦1,200.50")).toBe(true);
    expect(isValidCurrencyString("free")).toBe(false);
  });

  it("accepts zero and rejects the non-finite", () => {
    expect(isValidCurrencyAmount(0)).toBe(true);
    expect(isValidCurrencyAmount(Number.NaN)).toBe(false);
    expect(isValidCurrencyAmount(Number.POSITIVE_INFINITY)).toBe(false);
  });
});
