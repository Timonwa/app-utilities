import { describe, expect, it } from "vitest";
import {
  calculateNumberFromPercentage,
  calculateNumberPercentage,
  clampNumber,
  convertNumberToOrdinal,
  formatCompactNumber,
  formatDecimalInputWithCommas,
  formatNumberAsPercent,
  formatNumberWithCommas,
  isNumber,
  isNumberInRange,
  mapNumberToRange,
  parseStringToNumber,
  roundNumberToDecimal,
  roundNumberToNearest,
  sanitizeDecimalInput,
  stripNumberLeadingZeros,
} from "./index.js";

describe("calculations", () => {
  it("percentage maths", () => {
    expect(calculateNumberFromPercentage(20, 500)).toBe(100);
    expect(calculateNumberPercentage(50, 200)).toBe(25);
    expect(calculateNumberPercentage(1, 0)).toBe(0); // no divide-by-zero
  });

  it("clamp, map, round", () => {
    expect(clampNumber(15, 0, 10)).toBe(10);
    expect(mapNumberToRange(5, 0, 10, 0, 100)).toBe(50);
    expect(roundNumberToDecimal(12.3456, 2)).toBe(12.35);
    expect(roundNumberToNearest(47, 5)).toBe(45);
  });
});

describe("ordinals", () => {
  it("handles the teens, which naive %10 gets wrong", () => {
    expect(convertNumberToOrdinal(1)).toBe("1st");
    expect(convertNumberToOrdinal(2)).toBe("2nd");
    expect(convertNumberToOrdinal(11)).toBe("11th");
    expect(convertNumberToOrdinal(13)).toBe("13th");
    expect(convertNumberToOrdinal(22)).toBe("22nd");
    expect(convertNumberToOrdinal(101)).toBe("101st");
  });
});

describe("parseStringToNumber", () => {
  // Number("") is 0 in JS — an empty amount field must not become "free".
  it("returns null for empty and junk, per the parse contract", () => {
    expect(parseStringToNumber("12.5")).toBe(12.5);
    expect(parseStringToNumber("")).toBeNull();
    expect(parseStringToNumber("  ")).toBeNull();
    expect(parseStringToNumber("abc")).toBeNull();
  });
});

describe("formatting", () => {
  it("compact via Intl", () => {
    expect(formatCompactNumber(1_500_000)).toBe("1.5M");
    expect(formatCompactNumber(82_000)).toBe("82K");
    expect(formatCompactNumber(Number.NaN)).toBe("");
  });

  it("commas, percent, leading zeros", () => {
    expect(formatNumberWithCommas(1234567)).toBe("1,234,567");
    expect(formatNumberAsPercent(0.256)).toBe("25.6%");
    expect(stripNumberLeadingZeros("007")).toBe("7");
    expect(stripNumberLeadingZeros("0")).toBe("0");
  });

  it("decimal input helpers survive partial typing", () => {
    expect(sanitizeDecimalInput("1,2a3.4.5")).toBe("123.45");
    expect(formatDecimalInputWithCommas("1234.5")).toBe("1,234.5");
    expect(formatDecimalInputWithCommas("1234.")).toBe("1,234.");
  });
});

describe("validators", () => {
  it("isNumber rejects NaN and Infinity", () => {
    expect(isNumber(1.5)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isNumberInRange(5, 1, 10)).toBe(true);
  });
});
