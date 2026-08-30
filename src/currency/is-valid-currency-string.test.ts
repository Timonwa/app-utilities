import { describe, expect, it } from "vitest";
import { isValidCurrencyString } from "./index.js";

describe("isValidCurrencyString", () => {
  it("accepts symbol-and-separator amounts", () => {
    expect(isValidCurrencyString("₦1,200.50")).toBe(true);
    expect(isValidCurrencyString("$99")).toBe(true);
    expect(isValidCurrencyString("1.234,50")).toBe(true);
  });

  it("accepts zero", () => {
    expect(isValidCurrencyString("0")).toBe(true);
  });

  it("rejects unparseable strings", () => {
    expect(isValidCurrencyString("free")).toBe(false);
    expect(isValidCurrencyString("")).toBe(false);
  });

  it("rejects negative amounts", () => {
    expect(isValidCurrencyString("-5.00")).toBe(false);
  });
});
