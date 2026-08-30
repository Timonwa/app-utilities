import { describe, expect, it } from "vitest";
import { convertKilobytesToBytes } from "./index.js";

describe("convertKilobytesToBytes", () => {
  it("multiplies by 1024", () => {
    expect(convertKilobytesToBytes(2)).toBe(2048);
  });

  it("handles fractional kilobytes without rounding", () => {
    expect(convertKilobytesToBytes(1.5)).toBe(1536);
  });

  it("passes zero and negatives through", () => {
    expect(convertKilobytesToBytes(0)).toBe(0);
    expect(convertKilobytesToBytes(-1)).toBe(-1024);
  });
});
