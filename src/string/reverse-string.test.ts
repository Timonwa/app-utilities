import { describe, expect, it } from "vitest";
import { reverseString } from "./index.js";

describe("reverseString", () => {
  it("reverses by code point so astral characters survive", () => {
    expect(reverseString("hello")).toBe("olleh");
    // split("") would tear this into two broken surrogate halves.
    expect(reverseString("ab🎉")).toBe("🎉ba");
  });

  it("returns empty and single-character input untouched", () => {
    expect(reverseString("")).toBe("");
    expect(reverseString("a")).toBe("a");
  });

  it("handles accented characters", () => {
    expect(reverseString("café")).toBe("éfac");
  });
});
