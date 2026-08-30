import { describe, expect, it } from "vitest";
import {
  getCurrencyAmountAfterDiscount,
  getCurrencyAmountWithTax,
  getRoundedCurrencyAmount,
} from "./index.js";

describe("money maths", () => {
  it("discount and tax", () => {
    expect(getCurrencyAmountAfterDiscount(100, 20)).toBe(80);
    expect(getCurrencyAmountWithTax(100, 7.5)).toBe(107.5);
    expect(getRoundedCurrencyAmount(12.3456)).toBe(12.35);
    expect(getRoundedCurrencyAmount(12.3456, 0)).toBe(12);
  });

  it("keeps the edges of the discount range exact", () => {
    expect(getCurrencyAmountAfterDiscount(100, 0)).toBe(100);
    expect(getCurrencyAmountAfterDiscount(100, 100)).toBe(0);
  });

  it("takes fractional percentages", () => {
    expect(getCurrencyAmountAfterDiscount(200, 7.5)).toBe(185);
  });
});
