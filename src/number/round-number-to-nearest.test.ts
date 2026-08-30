import { describe, expect, it } from "vitest";
import { roundNumberToNearest } from "./index.js";

describe("roundNumberToNearest", () => {
  it("rounds to the nearest increment", () => {
    expect(roundNumberToNearest(23, 5)).toBe(25);
    expect(roundNumberToNearest(22, 5)).toBe(20);
  });

  it("rounds up at the exact midpoint", () => {
    expect(roundNumberToNearest(22.5, 5)).toBe(25);
  });

  it("supports fractional increments", () => {
    expect(roundNumberToNearest(0.7, 0.25)).toBe(0.75);
  });

  it("handles zero and negatives", () => {
    expect(roundNumberToNearest(0, 5)).toBe(0);
    expect(roundNumberToNearest(-23, 5)).toBe(-25);
  });
});
