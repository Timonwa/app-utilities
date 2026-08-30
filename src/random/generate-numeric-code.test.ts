import { describe, expect, it } from "vitest";
import { generateNumericCode } from "./index.js";

describe("generateNumericCode", () => {
  it("produces only digits at the requested length", () => {
    for (let run = 0; run < 20; run++) {
      expect(generateNumericCode(6)).toMatch(/^\d{6}$/);
    }
    expect(generateNumericCode(4)).toMatch(/^\d{4}$/);
    expect(generateNumericCode(1)).toMatch(/^\d$/);
  });

  it("returns an empty string for length zero", () => {
    expect(generateNumericCode(0)).toBe("");
  });

  it("varies between calls", () => {
    const codes = new Set(Array.from({ length: 20 }, () => generateNumericCode(8)));
    expect(codes.size).toBeGreaterThan(1);
  });
});
