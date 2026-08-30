import { describe, expect, it } from "vitest";
import { isArrayEmpty } from "./index.js";

describe("isArrayEmpty", () => {
  it("returns true for an empty array", () => {
    expect(isArrayEmpty([])).toBe(true);
  });

  it("returns false once the array has any item, even a falsy one", () => {
    expect(isArrayEmpty([0])).toBe(false);
    expect(isArrayEmpty([undefined])).toBe(false);
  });
});
