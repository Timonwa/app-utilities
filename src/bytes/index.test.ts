import { describe, expect, it } from "vitest";
import {
  convertBytesToMegabytes,
  convertGigabytesToBytes,
  convertGigabytesToMegabytes,
  convertKilobytesToBytes,
  convertMegabytesToBytes,
  convertMegabytesToGigabytes,
} from "./index.js";

describe("round trips", () => {
  it("converts back and forth exactly, without rounding in between", () => {
    expect(convertKilobytesToBytes(2)).toBe(2048);
    expect(convertMegabytesToBytes(1)).toBe(1_048_576);
    expect(convertGigabytesToBytes(1)).toBe(1_073_741_824);
    expect(convertMegabytesToGigabytes(1536)).toBe(1.5);
    expect(convertGigabytesToMegabytes(1.5)).toBe(1536);
  });

  // The originals did parseFloat(n.toFixed(2)) inside conversions, so a chain lost
  // precision silently. Rounding belongs at the display edge, not in the maths.
  it("survives a chain without drift", () => {
    const bytes = 1_234_567_890;
    expect(convertGigabytesToBytes(convertBytesToMegabytes(bytes) / 1024)).toBeCloseTo(
      bytes,
      5,
    );
  });
});
