import { describe, expect, it } from "vitest";
import { convertTimeTo12Hour, convertTimeTo24Hour } from "./index.js";

describe("12h / 24h conversion", () => {
  it("handles noon and midnight, the two everyone gets wrong", () => {
    expect(convertTimeTo12Hour(0, 5)).toBe("12:05 AM");
    expect(convertTimeTo12Hour(12, 0)).toBe("12:00 PM");
    expect(convertTimeTo12Hour(14, 30)).toBe("2:30 PM");
    expect(convertTimeTo24Hour(12, 0, "AM")).toEqual({ hours: 0, minutes: 0 });
    expect(convertTimeTo24Hour(12, 0, "PM")).toEqual({ hours: 12, minutes: 0 });
    expect(convertTimeTo24Hour(2, 30, "PM")).toEqual({ hours: 14, minutes: 30 });
  });

  it("round-trips through the 24-hour converter", () => {
    const { hours, minutes } = convertTimeTo24Hour(2, 30, "PM");
    expect(convertTimeTo12Hour(hours, minutes)).toBe("2:30 PM");
  });

  it("pads minutes but never hours", () => {
    expect(convertTimeTo12Hour(14, 5)).toBe("2:05 PM");
    expect(convertTimeTo12Hour(23, 59)).toBe("11:59 PM");
  });
});
