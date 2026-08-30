import { describe, expect, it } from "vitest";
import { convertTerabytesToBytes } from "./index.js";

describe("convertTerabytesToBytes", () => {
  it("multiplies by 1024^4", () => {
    expect(convertTerabytesToBytes(1)).toBe(1_099_511_627_776);
  });

  it("handles fractional terabytes without rounding", () => {
    expect(convertTerabytesToBytes(0.5)).toBe(549_755_813_888);
  });

  it("passes zero through", () => {
    expect(convertTerabytesToBytes(0)).toBe(0);
  });
});
