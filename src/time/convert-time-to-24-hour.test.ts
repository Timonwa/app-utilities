import { describe, expect, it } from "vitest";
import { convertTimeTo12Hour, convertTimeTo24Hour } from "./index.js";

describe("convertTimeTo24Hour", () => {
  it("adds twelve to PM hours other than 12", () => {
    expect(convertTimeTo24Hour(2, 30, "PM")).toEqual({ hours: 14, minutes: 30 });
    expect(convertTimeTo24Hour(11, 59, "PM")).toEqual({ hours: 23, minutes: 59 });
  });

  it("keeps AM hours other than 12 as-is", () => {
    expect(convertTimeTo24Hour(9, 15, "AM")).toEqual({ hours: 9, minutes: 15 });
  });

  it("maps 12 AM to hour 0 and keeps 12 PM as 12", () => {
    expect(convertTimeTo24Hour(12, 0, "AM")).toEqual({ hours: 0, minutes: 0 });
    expect(convertTimeTo24Hour(12, 0, "PM")).toEqual({ hours: 12, minutes: 0 });
  });

  it("round-trips with convertTimeTo12Hour", () => {
    const roundTrip = (hours: number, minutes: number) => {
      const [time, period] = convertTimeTo12Hour(hours, minutes).split(" ");
      const [h, m] = (time as string).split(":").map(Number);
      return convertTimeTo24Hour(h as number, m as number, period as "AM" | "PM");
    };
    expect(roundTrip(14, 30)).toEqual({ hours: 14, minutes: 30 });
    expect(roundTrip(0, 5)).toEqual({ hours: 0, minutes: 5 });
    expect(roundTrip(12, 0)).toEqual({ hours: 12, minutes: 0 });
  });
});
