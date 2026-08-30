import { describe, expect, it } from "vitest";
import { convertBytesToMegabytes, convertMegabytesToBytes } from "./index.js";

describe("convertMegabytesToBytes", () => {
  it("multiplies by 1024^2", () => {
    expect(convertMegabytesToBytes(1)).toBe(1_048_576);
  });

  it("handles fractional megabytes without rounding", () => {
    expect(convertMegabytesToBytes(1.5)).toBe(1_572_864);
  });

  it("passes zero through", () => {
    expect(convertMegabytesToBytes(0)).toBe(0);
  });

  it("round-trips with convertBytesToMegabytes", () => {
    expect(convertBytesToMegabytes(convertMegabytesToBytes(7.25))).toBe(7.25);
  });
});
