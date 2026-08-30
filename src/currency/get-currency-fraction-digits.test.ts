import { describe, expect, it } from "vitest";
import { getCurrencyFractionDigits } from "./index.js";

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
