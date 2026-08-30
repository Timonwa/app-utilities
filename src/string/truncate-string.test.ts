import { describe, expect, it } from "vitest";
import { truncateString } from "./index.js";

describe("truncateString", () => {
  it("never exceeds the requested length", () => {
    const result = truncateString("This is a long string", 10);
    expect(result).toBe("This is a…");
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it("returns short input untouched", () => {
    expect(truncateString("short", 10)).toBe("short");
  });

  it("degrades to a hard cut when there is no room for the ellipsis", () => {
    expect(truncateString("abcdef", 1)).toBe("a");
  });
});
