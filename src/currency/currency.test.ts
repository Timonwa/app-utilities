import { describe, expect, it } from "vitest";
import {
  convertCurrencyToMainUnit,
  convertCurrencyToSmallestUnit,
  formatCompactCurrencyAmount,
  formatCurrencyFromMinorUnit,
  formatCurrencyMapFromMinorUnits,
  getCurrencyAmountAfterDiscount,
  getCurrencyAmountWithTax,
  getCurrencyFractionDigits,
  getCurrencySymbol,
  getRoundedCurrencyAmount,
  isValidCurrencyAmount,
  isValidCurrencyString,
  parseCurrencyString,
} from "./index.js";

describe("getCurrencyFractionDigits", () => {
  it("resolves per-currency minor-unit digits from Intl", () => {
    expect(getCurrencyFractionDigits("NGN")).toBe(2);
    expect(getCurrencyFractionDigits("JPY")).toBe(0);
    expect(getCurrencyFractionDigits("KWD")).toBe(3);
  });

  it("falls back to 2 for an unknown code", () => {
    expect(getCurrencyFractionDigits("NOPE")).toBe(2);
  });
});

describe("minor-unit conversion", () => {
  it("uses the currency's own divisor, not a hardcoded 100", () => {
    expect(convertCurrencyToMainUnit(1250)).toBe(12.5);
    // The bug the old MINOR_CURRENCY_UNIT_DIVISOR=100 had: yen have no minor unit.
    expect(convertCurrencyToMainUnit(1250, "JPY")).toBe(1250);
    expect(convertCurrencyToMainUnit(1250, "KWD")).toBe(1.25);
    expect(convertCurrencyToSmallestUnit(12.5)).toBe(1250);
    expect(convertCurrencyToSmallestUnit(12.5, "JPY")).toBe(13);
  });
});

describe("parseCurrencyString", () => {
  it("handles US and European decimal styles", () => {
    expect(parseCurrencyString("₦1,234.50")).toBe(1234.5);
    expect(parseCurrencyString("1.234,50")).toBe(1234.5);
    expect(parseCurrencyString("1,234")).toBe(1234);
    expect(parseCurrencyString("12,34")).toBe(12.34);
  });

  // The old version returned 0 here, making "free" and "unreadable" identical.
  it("returns null for the unparseable", () => {
    expect(parseCurrencyString("free")).toBeNull();
    expect(parseCurrencyString("")).toBeNull();
  });
});

describe("formatting", () => {
  it("formats minor units with the right divisor per currency", () => {
    expect(formatCurrencyFromMinorUnit(123450, "NGN", { locale: "en-NG" })).toBe(
      "₦1,234.50",
    );
    expect(formatCurrencyFromMinorUnit(500, "JPY", { locale: "ja-JP" })).toBe("￥500");
  });

  it("formats a money map sorted descending, zeros dropped", () => {
    const lines = formatCurrencyMapFromMinorUnits(
      { USD: 4500, NGN: 12_000_000, EUR: 0 },
      { locale: "en-US" },
    );
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("120,000");
    expect(lines[1]).toContain("45.00");
  });

  it("formats compact main-unit amounts", () => {
    expect(formatCompactCurrencyAmount(1_500_000, "NGN", { locale: "en-NG" })).toContain(
      "1.5M",
    );
  });

  it("resolves symbols from Intl, locale-sensitively", () => {
    expect(getCurrencySymbol("NGN", "en-NG")).toBe("₦");
    expect(getCurrencySymbol("USD", "en-US")).toBe("$");
    expect(getCurrencySymbol("NOPE")).toBe("");
  });
});

describe("money maths", () => {
  it("discount and tax", () => {
    expect(getCurrencyAmountAfterDiscount(100, 20)).toBe(80);
    expect(getCurrencyAmountWithTax(100, 7.5)).toBe(107.5);
    expect(getRoundedCurrencyAmount(12.3456)).toBe(12.35);
    expect(getRoundedCurrencyAmount(12.3456, 0)).toBe(12);
  });

  it("validity checks", () => {
    expect(isValidCurrencyAmount(-1)).toBe(false);
    expect(isValidCurrencyAmount(12.5)).toBe(true);
    expect(isValidCurrencyString("₦1,200.50")).toBe(true);
    expect(isValidCurrencyString("free")).toBe(false);
  });
});
