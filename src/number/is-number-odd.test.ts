import { describe, expect, it } from "vitest";
import { isNumberOdd } from "./index.js";

describe("isNumberOdd", () => {
  it("returns true for odd integers, including negatives", () => {
    expect(isNumberOdd(5)).toBe(true);
    expect(isNumberOdd(-3)).toBe(true);
  });

  it("returns false for even integers including zero", () => {
    expect(isNumberOdd(4)).toBe(false);
    expect(isNumberOdd(0)).toBe(false);
  });
});
