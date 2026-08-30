import { describe, expect, it } from "vitest";
import { getFirstArrayItem } from "./index.js";

describe("getFirstArrayItem", () => {
  it("returns the first item", () => {
    expect(getFirstArrayItem([1, 2, 3])).toBe(1);
    expect(getFirstArrayItem(["only"])).toBe("only");
  });

  it("returns undefined for an empty array", () => {
    expect(getFirstArrayItem([])).toBeUndefined();
  });

  it("returns a stored undefined and a stored null as-is", () => {
    expect(getFirstArrayItem([undefined, 1])).toBeUndefined();
    expect(getFirstArrayItem([null, 1])).toBeNull();
  });
});
