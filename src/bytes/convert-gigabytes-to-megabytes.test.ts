import { describe, expect, it } from "vitest";
import { convertGigabytesToMegabytes, convertMegabytesToGigabytes } from "./index.js";

describe("convertGigabytesToMegabytes", () => {
  it("multiplies by 1024", () => {
    expect(convertGigabytesToMegabytes(1.5)).toBe(1536);
  });

  it("passes zero through", () => {
    expect(convertGigabytesToMegabytes(0)).toBe(0);
  });

  it("round-trips with convertMegabytesToGigabytes", () => {
    expect(convertMegabytesToGigabytes(convertGigabytesToMegabytes(2.25))).toBe(2.25);
  });
});
