import { describe, expect, it } from "vitest";
import { convertBytesToMegabytes } from "./index.js";

describe("convertBytesToMegabytes", () => {
  it("uses the binary 1024 step, not 1000", () => {
    expect(convertBytesToMegabytes(1_048_576)).toBe(1);
  });

  it("returns fractional megabytes without rounding", () => {
    expect(convertBytesToMegabytes(524_288)).toBe(0.5);
    expect(convertBytesToMegabytes(1_572_864)).toBe(1.5);
  });

  it("passes zero through", () => {
    expect(convertBytesToMegabytes(0)).toBe(0);
  });
});
