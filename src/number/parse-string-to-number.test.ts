import { describe, expect, it } from "vitest";
import { parseStringToNumber } from "./index.js";

describe("parseStringToNumber", () => {
  // Number("") is 0 in JS — an empty amount field must not become "free".
  it("returns null for empty and junk, per the parse contract", () => {
    expect(parseStringToNumber("12.5")).toBe(12.5);
    expect(parseStringToNumber("")).toBeNull();
    expect(parseStringToNumber("  ")).toBeNull();
    expect(parseStringToNumber("abc")).toBeNull();
  });

  it("parses signs, exponents, and padded input", () => {
    expect(parseStringToNumber("-3.5")).toBe(-3.5);
    expect(parseStringToNumber("1e3")).toBe(1000);
    expect(parseStringToNumber(" 12.5 ")).toBe(12.5);
  });

  it("rejects values that parse to the non-finite", () => {
    expect(parseStringToNumber("Infinity")).toBeNull();
  });
});
