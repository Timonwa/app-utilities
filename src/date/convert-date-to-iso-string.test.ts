import { describe, expect, it } from "vitest";
import { convertDateToISOString, convertISOStringToDate } from "./index.js";

describe("convertDateToISOString", () => {
  it("returns the full ISO 8601 UTC string", () => {
    expect(convertDateToISOString(new Date(Date.UTC(2024, 0, 15, 10, 30)))).toBe(
      "2024-01-15T10:30:00.000Z",
    );
  });

  it("round-trips with convertISOStringToDate", () => {
    const date = new Date(Date.UTC(2024, 0, 15, 10, 30, 45, 123));
    expect(convertISOStringToDate(convertDateToISOString(date)).getTime()).toBe(
      date.getTime(),
    );
  });

  it("formats the epoch", () => {
    expect(convertDateToISOString(new Date(0))).toBe("1970-01-01T00:00:00.000Z");
  });

  it("throws the platform RangeError for an invalid Date", () => {
    expect(() => convertDateToISOString(new Date(Number.NaN))).toThrow(RangeError);
  });
});
