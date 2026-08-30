import { describe, expect, it } from "vitest";
import { convertCurrencyToMainUnit, convertCurrencyToSmallestUnit } from "./index.js";

describe("convertCurrencyToSmallestUnit", () => {
  it("converts main units to minor units with the default two digits", () => {
    expect(convertCurrencyToSmallestUnit(12.5)).toBe(1250);
    expect(convertCurrencyToSmallestUnit(1)).toBe(100);
  });

  it("uses the currency's own fraction digits when given", () => {
    expect(convertCurrencyToSmallestUnit(12.5, "JPY")).toBe(13);
    expect(convertCurrencyToSmallestUnit(1.2345, "KWD")).toBe(1235);
  });

  it("rounds to a whole minor unit", () => {
    expect(convertCurrencyToSmallestUnit(0.005)).toBe(1);
    expect(convertCurrencyToSmallestUnit(0.004)).toBe(0);
  });

  it("handles zero", () => {
    expect(convertCurrencyToSmallestUnit(0)).toBe(0);
  });

  it("round-trips with convertCurrencyToMainUnit", () => {
    expect(convertCurrencyToMainUnit(convertCurrencyToSmallestUnit(12.5))).toBe(12.5);
  });
});
