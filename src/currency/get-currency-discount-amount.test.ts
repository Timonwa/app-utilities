import { describe, expect, it } from "vitest";
import { getCurrencyDiscountAmount } from "./index.js";

describe("getCurrencyDiscountAmount", () => {
  it("returns the discount portion of the price", () => {
    expect(getCurrencyDiscountAmount(100, 20)).toBe(20);
    expect(getCurrencyDiscountAmount(80, 25)).toBe(20);
  });

  it("returns zero for a zero percentage or zero price", () => {
    expect(getCurrencyDiscountAmount(100, 0)).toBe(0);
    expect(getCurrencyDiscountAmount(0, 20)).toBe(0);
  });

  it("handles fractional percentages and 100%", () => {
    expect(getCurrencyDiscountAmount(100, 12.5)).toBe(12.5);
    expect(getCurrencyDiscountAmount(59.99, 100)).toBe(59.99);
  });
});
