import { describe, expect, it } from "vitest";
import { convertDateToMillis, convertMillisToDate } from "./index.js";

describe("convertDateToMillis", () => {
  it("returns unix milliseconds", () => {
    expect(convertDateToMillis(new Date(Date.UTC(2024, 0, 15)))).toBe(1_705_276_800_000);
    expect(convertDateToMillis(new Date(0))).toBe(0);
  });

  it("round-trips with convertMillisToDate", () => {
    const millis = 1_705_276_800_123;
    expect(convertDateToMillis(convertMillisToDate(millis))).toBe(millis);
  });

  it("returns NaN for an invalid Date", () => {
    expect(convertDateToMillis(new Date("junk"))).toBeNaN();
  });
});
