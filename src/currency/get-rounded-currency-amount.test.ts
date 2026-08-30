import { describe, expect, it } from "vitest";
import { getRoundedCurrencyAmount } from "./index.js";

describe("getRoundedCurrencyAmount", () => {
  it("rounds half-up to two decimals by default", () => {
    expect(getRoundedCurrencyAmount(12.3456)).toBe(12.35);
    expect(getRoundedCurrencyAmount(12.344)).toBe(12.34);
    expect(getRoundedCurrencyAmount(12.345)).toBe(12.35);
  });

  it("honours a custom fraction-digits argument", () => {
    expect(getRoundedCurrencyAmount(12.3456, 0)).toBe(12);
    expect(getRoundedCurrencyAmount(12.3456, 3)).toBe(12.346);
  });

  it("handles zero and negatives", () => {
    expect(getRoundedCurrencyAmount(0)).toBe(0);
    expect(getRoundedCurrencyAmount(-12.345, 1)).toBe(-12.3);
  });
});
