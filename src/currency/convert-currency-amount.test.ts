import { describe, expect, it } from "vitest";
import { convertCurrencyAmount } from "./index.js";

describe("convertCurrencyAmount", () => {
  it("multiplies the amount by the exchange rate", () => {
    expect(convertCurrencyAmount(100, 1.5)).toBe(150);
    expect(convertCurrencyAmount(20, 0.5)).toBe(10);
  });

  it("does not round — rounding policy belongs to the app", () => {
    expect(convertCurrencyAmount(10, 1.2345)).toBeCloseTo(12.345, 10);
  });

  it("handles zero on either side", () => {
    expect(convertCurrencyAmount(0, 1.5)).toBe(0);
    expect(convertCurrencyAmount(100, 0)).toBe(0);
  });
});
