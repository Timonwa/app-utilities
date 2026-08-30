import { describe, expect, it } from "vitest";
import { parseCurrencyString } from "./index.js";

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

  it("keeps the sign", () => {
    expect(parseCurrencyString("-1,234.50")).toBe(-1234.5);
  });
});
