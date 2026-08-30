import { describe, expect, it } from "vitest";
import { getCurrencySymbol } from "./index.js";

describe("getCurrencySymbol", () => {
  it("resolves symbols from Intl, locale-sensitively", () => {
    expect(getCurrencySymbol("NGN", "en-NG")).toBe("₦");
    expect(getCurrencySymbol("USD", "en-US")).toBe("$");
    expect(getCurrencySymbol("NOPE")).toBe("");
  });

  it("renders foreign currencies with a disambiguating prefix", () => {
    // Intl being right, not wrong: outside the US, "$" alone is ambiguous.
    expect(getCurrencySymbol("USD", "en-NG")).toBe("US$");
    expect(getCurrencySymbol("JPY", "ja-JP")).toBe("￥");
  });
});
