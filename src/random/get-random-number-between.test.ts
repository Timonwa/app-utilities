import { describe, expect, it } from "vitest";
import { getRandomNumberBetween } from "./index.js";

describe("generators", () => {
  it("random number stays in its inclusive range", () => {
    for (let i = 0; i < 50; i++) {
      const n = getRandomNumberBetween(1, 6);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(6);
      expect(Number.isInteger(n)).toBe(true);
    }
  });

  it("collapses to the single value when min equals max", () => {
    expect(getRandomNumberBetween(7, 7)).toBe(7);
  });

  it("works across negative ranges", () => {
    for (let i = 0; i < 20; i++) {
      const n = getRandomNumberBetween(-6, -1);
      expect(n).toBeGreaterThanOrEqual(-6);
      expect(n).toBeLessThanOrEqual(-1);
    }
  });
});
