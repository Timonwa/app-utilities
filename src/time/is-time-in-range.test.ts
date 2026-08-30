import { describe, expect, it } from "vitest";
import { getTimeDifferenceInMillis, isTimeInRange, parseTimeString } from "./index.js";

describe("parsing and ranges", () => {
  it("parses, diffs, and range-checks", () => {
    expect(parseTimeString("14:30")).toEqual({ hours: 14, minutes: 30, seconds: 0 });
    expect(getTimeDifferenceInMillis("14:00", "16:30")).toBe(9_000_000);
    expect(isTimeInRange("14:00", "09:00", "17:00")).toBe(true);
    expect(isTimeInRange("18:00", "09:00", "17:00")).toBe(false);
  });

  it("treats both range ends as inclusive", () => {
    expect(isTimeInRange("09:00", "09:00", "17:00")).toBe(true);
    expect(isTimeInRange("17:00", "09:00", "17:00")).toBe(true);
    expect(isTimeInRange("08:59", "09:00", "17:00")).toBe(false);
  });

  it("returns a signed difference", () => {
    expect(getTimeDifferenceInMillis("16:30", "14:00")).toBe(-9_000_000);
  });

  it("parses seconds when present", () => {
    expect(parseTimeString("14:30:45")).toEqual({ hours: 14, minutes: 30, seconds: 45 });
  });
});
