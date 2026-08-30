import { describe, expect, it } from "vitest";
import { isNumberInRange } from "./index.js";

describe("isNumberInRange", () => {
  it("returns true inside the range", () => {
    expect(isNumberInRange(5, 1, 10)).toBe(true);
  });

  it("is inclusive at both bounds", () => {
    expect(isNumberInRange(1, 1, 10)).toBe(true);
    expect(isNumberInRange(10, 1, 10)).toBe(true);
  });

  it("returns false outside the range", () => {
    expect(isNumberInRange(0, 1, 10)).toBe(false);
    expect(isNumberInRange(11, 1, 10)).toBe(false);
  });

  it("works with negative ranges", () => {
    expect(isNumberInRange(-5, -10, -1)).toBe(true);
  });
});
