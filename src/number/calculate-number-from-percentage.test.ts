import { describe, expect, it } from "vitest";
import { calculateNumberFromPercentage, calculateNumberPercentage } from "./index.js";

describe("calculateNumberFromPercentage", () => {
  it("returns the portion of the total the percentage names", () => {
    expect(calculateNumberFromPercentage(25, 100)).toBe(25);
    expect(calculateNumberFromPercentage(50, 80)).toBe(40);
  });

  it("handles zero percent and zero totals", () => {
    expect(calculateNumberFromPercentage(0, 100)).toBe(0);
    expect(calculateNumberFromPercentage(50, 0)).toBe(0);
  });

  it("handles fractional and over-100 percentages", () => {
    expect(calculateNumberFromPercentage(12.5, 200)).toBe(25);
    expect(calculateNumberFromPercentage(150, 10)).toBe(15);
  });

  it("round-trips with calculateNumberPercentage", () => {
    expect(calculateNumberFromPercentage(calculateNumberPercentage(30, 120), 120)).toBe(
      30,
    );
  });
});
