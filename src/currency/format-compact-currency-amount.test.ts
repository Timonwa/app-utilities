import { describe, expect, it } from "vitest";
import { formatCompactCurrencyAmount } from "./index.js";

describe("formatCompactCurrencyAmount", () => {
  it("formats compact main-unit amounts", () => {
    expect(formatCompactCurrencyAmount(1_500_000, "NGN", { locale: "en-NG" })).toContain(
      "1.5M",
    );
  });

  it("picks the compact unit by magnitude", () => {
    expect(formatCompactCurrencyAmount(2300, "USD", { locale: "en-US" })).toBe("$2.3K");
    expect(formatCompactCurrencyAmount(950, "USD", { locale: "en-US" })).toBe("$950");
  });

  it("falls back to the raw amount for an unknown currency", () => {
    expect(formatCompactCurrencyAmount(1500, "NOPE", { locale: "en-US" })).toBe("1500");
  });
});
