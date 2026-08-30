import { describe, expect, it } from "vitest";
import { roundNumberToDecimal } from "./index.js";

describe("roundNumberToDecimal", () => {
  it("rounds to the requested decimal places and returns a number", () => {
    expect(roundNumberToDecimal(123.456, 2)).toBe(123.46);
    expect(roundNumberToDecimal(123.454, 2)).toBe(123.45);
  });

  it("supports zero decimals", () => {
    expect(roundNumberToDecimal(2.5, 0)).toBe(3);
  });

  it("does not add trailing digits to already-short numbers", () => {
    expect(roundNumberToDecimal(5, 2)).toBe(5);
  });

  it("handles negatives", () => {
    expect(roundNumberToDecimal(-1.234, 1)).toBe(-1.2);
  });
});
