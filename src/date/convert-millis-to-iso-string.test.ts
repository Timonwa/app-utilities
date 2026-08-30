import { describe, expect, it } from "vitest";
import { convertISOStringToMillis, convertMillisToISOString } from "./index.js";

describe("convertMillisToISOString", () => {
  it("converts millis to the full ISO string", () => {
    expect(convertMillisToISOString(1_705_276_800_000)).toBe("2024-01-15T00:00:00.000Z");
  });

  it("keeps millisecond precision", () => {
    expect(convertMillisToISOString(1_705_276_800_123)).toBe("2024-01-15T00:00:00.123Z");
  });

  it("round-trips with convertISOStringToMillis", () => {
    expect(convertISOStringToMillis(convertMillisToISOString(42))).toBe(42);
  });

  it("throws the platform RangeError for non-finite millis", () => {
    expect(() => convertMillisToISOString(Number.NaN)).toThrow(RangeError);
  });
});
