import { describe, expect, it } from "vitest";
import { formatNumberToDecimal } from "./index.js";

describe("formatNumberToDecimal", () => {
  it("fixes the number to the requested decimal places", () => {
    expect(formatNumberToDecimal(1.23456, 2)).toBe("1.23");
    expect(formatNumberToDecimal(5, 2)).toBe("5.00");
  });

  it("rounds rather than truncating", () => {
    expect(formatNumberToDecimal(2.675, 1)).toBe("2.7");
  });

  it("handles zero decimals and negatives", () => {
    expect(formatNumberToDecimal(3.6, 0)).toBe("4");
    expect(formatNumberToDecimal(-1.005, 1)).toBe("-1.0");
  });
});
