import { describe, expect, it } from "vitest";
import { getCurrencyAmountWithTax } from "./index.js";

describe("getCurrencyAmountWithTax", () => {
  it("adds the tax portion to the price", () => {
    expect(getCurrencyAmountWithTax(100, 7.5)).toBe(107.5);
    expect(getCurrencyAmountWithTax(200, 10)).toBe(220);
  });

  it("returns the price unchanged at a zero rate", () => {
    expect(getCurrencyAmountWithTax(100, 0)).toBe(100);
  });

  it("handles a zero price", () => {
    expect(getCurrencyAmountWithTax(0, 7.5)).toBe(0);
  });
});
