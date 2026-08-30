import { describe, expect, it } from "vitest";
import { convertMegabytesToGigabytes } from "./index.js";

describe("convertMegabytesToGigabytes", () => {
  it("divides by 1024", () => {
    expect(convertMegabytesToGigabytes(1536)).toBe(1.5);
  });

  it("returns fractions below one gigabyte without rounding", () => {
    expect(convertMegabytesToGigabytes(512)).toBe(0.5);
  });

  it("passes zero through", () => {
    expect(convertMegabytesToGigabytes(0)).toBe(0);
  });
});
