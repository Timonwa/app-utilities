import { describe, expect, it } from "vitest";
import { addDaysToDate, formatDateToIsoDate, getNextWeekdayDate } from "./index.js";

describe("getNextWeekdayDate", () => {
  it("lands on the asked weekday, never in the past", () => {
    const friday = getNextWeekdayDate(5);
    expect(friday.getDay()).toBe(5);
    expect(addDaysToDate(friday, 1) > new Date()).toBe(true);
  });

  it("counts forward from an explicit start date", () => {
    // 2024-01-15 was a Monday.
    const monday = new Date(2024, 0, 15);
    expect(formatDateToIsoDate(getNextWeekdayDate(5, monday))).toBe("2024-01-19");
  });

  it("returns the start date itself when it already matches", () => {
    const monday = new Date(2024, 0, 15);
    expect(formatDateToIsoDate(getNextWeekdayDate(1, monday))).toBe("2024-01-15");
  });

  it("wraps into the next week when the weekday has passed", () => {
    const friday = new Date(2024, 0, 19);
    expect(formatDateToIsoDate(getNextWeekdayDate(1, friday))).toBe("2024-01-22");
  });
});
