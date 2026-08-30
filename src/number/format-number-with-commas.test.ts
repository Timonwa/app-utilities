import { describe, expect, it } from "vitest";
import { formatNumberWithCommas } from "./index.js";

describe("formatNumberWithCommas", () => {
  it("separates thousands with commas", () => {
    expect(formatNumberWithCommas(1_234_567)).toBe("1,234,567");
  });

  it("defaults to zero decimal places", () => {
    expect(formatNumberWithCommas(1234.56)).toBe("1,235");
  });

  it("pads and truncates to the requested decimals", () => {
    expect(formatNumberWithCommas(1_234_567.891, 2)).toBe("1,234,567.89");
    expect(formatNumberWithCommas(5, 2)).toBe("5.00");
  });

  it("handles zero and negatives", () => {
    expect(formatNumberWithCommas(0)).toBe("0");
    expect(formatNumberWithCommas(-9876.5, 1)).toBe("-9,876.5");
  });
});
