import { describe, expect, it } from "vitest";
import { mapNumberToRange } from "./index.js";

describe("mapNumberToRange", () => {
  it("maps linearly between the two ranges", () => {
    expect(mapNumberToRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapNumberToRange(0, 0, 10, 0, 100)).toBe(0);
    expect(mapNumberToRange(10, 0, 10, 0, 100)).toBe(100);
  });

  it("supports inverted target ranges", () => {
    expect(mapNumberToRange(2, 0, 10, 100, 0)).toBe(80);
  });

  it("extrapolates values outside the source range", () => {
    expect(mapNumberToRange(15, 0, 10, 0, 100)).toBe(150);
  });

  it("works with negative ranges", () => {
    expect(mapNumberToRange(-5, -10, 0, 0, 1)).toBe(0.5);
  });
});
