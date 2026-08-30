import { describe, expect, it } from "vitest";
import { convertBytesToKilobytes, convertKilobytesToBytes } from "./index.js";

describe("convertBytesToKilobytes", () => {
  it("uses the binary 1024 step, not 1000", () => {
    expect(convertBytesToKilobytes(2048)).toBe(2);
  });

  it("returns fractional kilobytes without rounding", () => {
    expect(convertBytesToKilobytes(1536)).toBe(1.5);
    expect(convertBytesToKilobytes(1)).toBe(1 / 1024);
  });

  it("passes zero and negatives through", () => {
    expect(convertBytesToKilobytes(0)).toBe(0);
    expect(convertBytesToKilobytes(-1024)).toBe(-1);
  });

  it("round-trips with convertKilobytesToBytes", () => {
    expect(convertKilobytesToBytes(convertBytesToKilobytes(123_456))).toBe(123_456);
  });
});
