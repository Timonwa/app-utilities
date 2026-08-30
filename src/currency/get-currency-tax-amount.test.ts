import { describe, expect, it } from "vitest";
import { getCurrencyTaxAmount } from "./index.js";

describe("getCurrencyTaxAmount", () => {
  it("returns the tax portion of the price", () => {
    expect(getCurrencyTaxAmount(100, 7.5)).toBe(7.5);
    expect(getCurrencyTaxAmount(200, 10)).toBe(20);
  });

  it("returns zero for a zero rate or zero price", () => {
    expect(getCurrencyTaxAmount(100, 0)).toBe(0);
    expect(getCurrencyTaxAmount(0, 7.5)).toBe(0);
  });

  it("does not round", () => {
    expect(getCurrencyTaxAmount(9.99, 7.5)).toBeCloseTo(0.74925, 10);
  });
});
