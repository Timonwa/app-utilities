import { describe, expect, it } from "vitest";
import {
  clampNumber,
  mapNumberToRange,
  roundNumberToDecimal,
  roundNumberToNearest,
} from "./index.js";

describe("calculations", () => {
  it("clamp, map, round", () => {
    expect(clampNumber(15, 0, 10)).toBe(10);
    expect(mapNumberToRange(5, 0, 10, 0, 100)).toBe(50);
    expect(roundNumberToDecimal(12.3456, 2)).toBe(12.35);
    expect(roundNumberToNearest(47, 5)).toBe(45);
  });

  it("treats clamp bounds as inclusive", () => {
    expect(clampNumber(0, 0, 10)).toBe(0);
    expect(clampNumber(10, 0, 10)).toBe(10);
    expect(clampNumber(5, 0, 10)).toBe(5);
  });

  it("clamps within negative ranges", () => {
    expect(clampNumber(-15, -10, -5)).toBe(-10);
    expect(clampNumber(0, -10, -5)).toBe(-5);
  });
});
