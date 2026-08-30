import { describe, expect, it } from "vitest";
import {
  formatNumberAsPercent,
  formatNumberWithCommas,
  stripNumberLeadingZeros,
} from "./index.js";

describe("formatting", () => {
  it("commas, percent, leading zeros", () => {
    expect(formatNumberWithCommas(1234567)).toBe("1,234,567");
    expect(formatNumberAsPercent(0.256)).toBe("25.6%");
    expect(stripNumberLeadingZeros("007")).toBe("7");
    expect(stripNumberLeadingZeros("0")).toBe("0");
  });

  it("collapses an all-zero string to a single zero", () => {
    expect(stripNumberLeadingZeros("000")).toBe("0");
  });

  it("only touches purely numeric strings", () => {
    expect(stripNumberLeadingZeros("012.5")).toBe("012.5");
    expect(stripNumberLeadingZeros("")).toBe("");
  });
});
