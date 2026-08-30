import { describe, expect, it } from "vitest";
import { convertGigabytesToBytes } from "./index.js";

describe("convertGigabytesToBytes", () => {
  it("multiplies by 1024^3", () => {
    expect(convertGigabytesToBytes(1)).toBe(1_073_741_824);
  });

  it("handles fractional gigabytes without rounding", () => {
    expect(convertGigabytesToBytes(0.5)).toBe(536_870_912);
  });

  it("passes zero through", () => {
    expect(convertGigabytesToBytes(0)).toBe(0);
  });
});
