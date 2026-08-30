import { describe, expect, it } from "vitest";
import { hasArrayItem } from "./index.js";

describe("hasArrayItem", () => {
  it("finds a present value", () => {
    expect(hasArrayItem([1, 2, 3], 2)).toBe(true);
    expect(hasArrayItem(["a", "b"], "b")).toBe(true);
  });

  it("returns false for an absent value or empty array", () => {
    expect(hasArrayItem([1, 2, 3], 4)).toBe(false);
    expect(hasArrayItem([], 1)).toBe(false);
  });

  it("compares objects by reference, not by shape", () => {
    const item = { id: 1 };
    expect(hasArrayItem([item], item)).toBe(true);
    expect(hasArrayItem([{ id: 1 }], { id: 1 })).toBe(false);
  });

  it("finds NaN, matching Array.prototype.includes semantics", () => {
    expect(hasArrayItem([Number.NaN], Number.NaN)).toBe(true);
  });
});
