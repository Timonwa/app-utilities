import { describe, expect, it } from "vitest";
import { convertCurrencyToMainUnit, convertCurrencyToSmallestUnit } from "./index.js";

describe("minor-unit conversion", () => {
  it("uses the currency's own divisor, not a hardcoded 100", () => {
    expect(convertCurrencyToMainUnit(1250)).toBe(12.5);
    // The bug the old MINOR_CURRENCY_UNIT_DIVISOR=100 had: yen have no minor unit.
    expect(convertCurrencyToMainUnit(1250, "JPY")).toBe(1250);
    expect(convertCurrencyToMainUnit(1250, "KWD")).toBe(1.25);
    expect(convertCurrencyToSmallestUnit(12.5)).toBe(1250);
    expect(convertCurrencyToSmallestUnit(12.5, "JPY")).toBe(13);
  });

  it("passes zero and negative amounts through the divisor", () => {
    expect(convertCurrencyToMainUnit(0)).toBe(0);
    expect(convertCurrencyToMainUnit(-1250)).toBe(-12.5);
  });

  it("assumes two digits for an unknown currency", () => {
    expect(convertCurrencyToMainUnit(1250, "NOPE")).toBe(12.5);
  });
});
