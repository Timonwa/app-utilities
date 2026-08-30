import { describe, expect, it } from "vitest";
import { formatCurrencyFromMinorUnit } from "./index.js";

describe("formatCurrencyFromMinorUnit", () => {
  it("formats minor units with the right divisor per currency", () => {
    expect(formatCurrencyFromMinorUnit(123450, "NGN", { locale: "en-NG" })).toBe(
      "₦1,234.50",
    );
    expect(formatCurrencyFromMinorUnit(500, "JPY", { locale: "ja-JP" })).toBe("￥500");
  });

  it("divides by 1000 for three-digit currencies", () => {
    // The space Intl emits between code and number is a non-breaking one.
    expect(formatCurrencyFromMinorUnit(1500, "KWD", { locale: "en-US" })).toBe(
      "KWD\u00a01.500",
    );
  });

  it("accepts bigint amounts and keeps the sign", () => {
    expect(formatCurrencyFromMinorUnit(123450n, "NGN", { locale: "en-NG" })).toBe(
      "₦1,234.50",
    );
    expect(formatCurrencyFromMinorUnit(-123450, "NGN", { locale: "en-NG" })).toBe(
      "-₦1,234.50",
    );
  });

  it("falls back to the raw amount for an unknown currency", () => {
    expect(formatCurrencyFromMinorUnit(500, "NOPE")).toBe("500");
  });
});
