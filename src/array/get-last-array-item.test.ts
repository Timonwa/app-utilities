import { describe, expect, it } from "vitest";
import { getLastArrayItem } from "./index.js";

describe("getLastArrayItem", () => {
  it("returns the last item", () => {
    expect(getLastArrayItem([1, 2, 3])).toBe(3);
    expect(getLastArrayItem(["only"])).toBe("only");
  });

  it("returns undefined for an empty array", () => {
    expect(getLastArrayItem([])).toBeUndefined();
  });

  it("returns a stored null as-is", () => {
    expect(getLastArrayItem([1, null])).toBeNull();
  });
});
