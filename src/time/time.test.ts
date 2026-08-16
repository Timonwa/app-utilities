import { describe, expect, it } from "vitest";
import {
  addMinutesToTime,
  convertTimeTo12Hour,
  convertTimeTo24Hour,
  floorDateTimeLocalToHalfHour,
  floorDateTimeLocalToHour,
  formatMillisToDuration,
  formatMillisToShortDuration,
  formatMillisToTime,
  formatSecondsToTime,
  formatTimeTo12Hour,
  getTimeDifferenceInMillis,
  isTimeInRange,
  isValidTimeString,
  parseTimeString,
} from "./index.js";

describe("clock arithmetic", () => {
  it("adds minutes, wrapping midnight", () => {
    expect(addMinutesToTime("14:30", 45)).toBe("15:15");
    expect(addMinutesToTime("23:30", 45)).toBe("00:15");
  });
});

describe("12h / 24h conversion", () => {
  it("handles noon and midnight, the two everyone gets wrong", () => {
    expect(convertTimeTo12Hour(0, 5)).toBe("12:05 AM");
    expect(convertTimeTo12Hour(12, 0)).toBe("12:00 PM");
    expect(convertTimeTo12Hour(14, 30)).toBe("2:30 PM");
    expect(convertTimeTo24Hour(12, 0, "AM")).toEqual({ hours: 0, minutes: 0 });
    expect(convertTimeTo24Hour(12, 0, "PM")).toEqual({ hours: 12, minutes: 0 });
    expect(convertTimeTo24Hour(2, 30, "PM")).toEqual({ hours: 14, minutes: 30 });
  });

  it("formatTimeTo12Hour degrades to empty for junk", () => {
    expect(formatTimeTo12Hour("14:30")).toBe("2:30 PM");
    expect(formatTimeTo12Hour("nope")).toBe("");
  });
});

describe("datetime-local flooring", () => {
  it("floors to hour and half-hour", () => {
    expect(floorDateTimeLocalToHour("2026-09-23T10:42")).toBe("2026-09-23T10:00");
    expect(floorDateTimeLocalToHalfHour("2026-09-23T10:42")).toBe("2026-09-23T10:30");
    expect(floorDateTimeLocalToHalfHour("2026-09-23T10:12")).toBe("2026-09-23T10:00");
  });
});

describe("duration formatting", () => {
  it("covers the three shapes", () => {
    expect(formatSecondsToTime(3661)).toBe("01:01:01");
    expect(formatSecondsToTime(90, false)).toBe("01:30");
    expect(formatMillisToTime(3_661_000)).toBe("01:01:01");
    expect(formatMillisToDuration(90_061_000)).toBe("1 day, 1 hour, 1 minute, 1 second");
    expect(formatMillisToShortDuration(9_000_000)).toBe("2h 30m");
    expect(formatMillisToDuration(0)).toBe("0 seconds");
  });
});

describe("parsing and ranges", () => {
  it("parses, diffs, and range-checks", () => {
    expect(parseTimeString("14:30")).toEqual({ hours: 14, minutes: 30, seconds: 0 });
    expect(getTimeDifferenceInMillis("14:00", "16:30")).toBe(9_000_000);
    expect(isTimeInRange("14:00", "09:00", "17:00")).toBe(true);
    expect(isTimeInRange("18:00", "09:00", "17:00")).toBe(false);
  });

  it("rejects impossible clock times", () => {
    expect(isValidTimeString("25:00")).toBe(false);
    expect(isValidTimeString("14:30")).toBe(true);
    expect(isValidTimeString("9:05")).toBe(true);
  });
});
