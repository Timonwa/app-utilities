import { describe, expect, it } from "vitest";
import { calculateNumberFromPercentage, calculateNumberPercentage } from "./index.js";

describe("calculations", () => {
  it("percentage maths", () => {
    expect(calculateNumberFromPercentage(20, 500)).toBe(100);
    expect(calculateNumberPercentage(50, 200)).toBe(25);
    expect(calculateNumberPercentage(1, 0)).toBe(0); // no divide-by-zero
  });

  it("rounds to the requested decimals", () => {
    expect(calculateNumberPercentage(1, 3)).toBe(33.33);
    expect(calculateNumberPercentage(1, 3, 0)).toBe(33);
  });

  it("can exceed 100 when the value outgrows the total", () => {
    expect(calculateNumberPercentage(150, 100)).toBe(150);
  });
});
