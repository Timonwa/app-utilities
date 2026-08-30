import { describe, expect, it } from "vitest";
import { convertBytesToGigabytes, convertGigabytesToBytes } from "./index.js";

describe("convertBytesToGigabytes", () => {
  it("uses the binary 1024^3 step", () => {
    expect(convertBytesToGigabytes(1_073_741_824)).toBe(1);
  });

  it("returns fractional gigabytes without rounding", () => {
    expect(convertBytesToGigabytes(536_870_912)).toBe(0.5);
  });

  it("passes zero through", () => {
    expect(convertBytesToGigabytes(0)).toBe(0);
  });

  it("round-trips with convertGigabytesToBytes", () => {
    expect(convertGigabytesToBytes(convertBytesToGigabytes(3_221_225_472))).toBe(
      3_221_225_472,
    );
  });
});
