import { describe, expect, it } from "vitest";
import { formatCurrencyAmountWithoutSymbol } from "./index.js";

describe("formatCurrencyAmountWithoutSymbol", () => {
  it("adds thousands separators and two fixed decimals, no symbol", () => {
    expect(formatCurrencyAmountWithoutSymbol(1234.5, "en-US")).toBe("1,234.50");
    expect(formatCurrencyAmountWithoutSymbol(0, "en-US")).toBe("0.00");
  });

  it("truncates extra precision to two decimals by rounding", () => {
    expect(formatCurrencyAmountWithoutSymbol(9.999, "en-US")).toBe("10.00");
  });

  it("respects the locale's separators", () => {
    expect(formatCurrencyAmountWithoutSymbol(1234.5, "de-DE")).toBe("1.234,50");
  });

  it("formats negatives", () => {
    expect(formatCurrencyAmountWithoutSymbol(-1234.5, "en-US")).toBe("-1,234.50");
  });
});
