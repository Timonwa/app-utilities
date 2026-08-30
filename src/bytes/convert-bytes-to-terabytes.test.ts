import { describe, expect, it } from "vitest";
import { convertBytesToTerabytes, convertTerabytesToBytes } from "./index.js";

describe("convertBytesToTerabytes", () => {
  it("uses the binary 1024^4 step", () => {
    expect(convertBytesToTerabytes(1_099_511_627_776)).toBe(1);
  });

  it("returns fractional terabytes without rounding", () => {
    expect(convertBytesToTerabytes(549_755_813_888)).toBe(0.5);
  });

  it("passes zero through", () => {
    expect(convertBytesToTerabytes(0)).toBe(0);
  });

  it("round-trips with convertTerabytesToBytes", () => {
    expect(convertTerabytesToBytes(convertBytesToTerabytes(2_199_023_255_552))).toBe(
      2_199_023_255_552,
    );
  });
});
