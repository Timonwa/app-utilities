import { describe, expect, it } from "vitest";
import {
  addDaysToDate,
  addHoursToDate,
  addMinutesToDate,
  addMonthsToDate,
  addMonthsToISODate,
  addMonthsToMillis,
  addYearsToDate,
  compareDates,
  convertISOStringToMillis,
  convertMillisToISOString,
  formatDateToIsoDate,
  formatDateToRelative,
  formatDateToRelativeShort,
  formatMillisToRelative,
  getDaysBetweenDates,
  getEndOfMonthMillis,
  getNextWeekdayDate,
  getStartOfMonthMillis,
  getTodayISODate,
  isISODateToday,
  isMillisToday,
  isValidDate,
  isValidISODate,
} from "./index.js";

describe("calendar arithmetic clamps instead of overflowing", () => {
  // setMonth would give Mar 2 here; the whole reason date-fns earns its place.
  it("Jan 31 + 1 month is the end of February", () => {
    expect(formatDateToIsoDate(addMonthsToDate(new Date(2024, 0, 31), 1))).toBe(
      "2024-02-29",
    );
    expect(formatDateToIsoDate(addMonthsToDate(new Date(2025, 0, 31), 1))).toBe(
      "2025-02-28",
    );
  });

  it("Feb 29 + 1 year is Feb 28", () => {
    expect(formatDateToIsoDate(addYearsToDate(new Date(2024, 1, 29), 1))).toBe(
      "2025-02-28",
    );
  });

  it("works identically through the ISO and millis representations", () => {
    expect(addMonthsToISODate("2024-01-31T00:00:00.000Z", 1)).toContain("2024-02-29");
    const clamped = new Date(addMonthsToMillis(new Date(2024, 0, 31).getTime(), 1));
    expect(clamped.getDate()).toBe(29);
  });
});

describe("local calendar dates, never UTC-shifted", () => {
  // toISOString() converts to UTC first — near midnight that is a different day.
  it("formats the LOCAL date", () => {
    expect(formatDateToIsoDate(new Date(2024, 0, 15, 0, 30))).toBe("2024-01-15");
  });

  it("today's ISO date matches local now", () => {
    const now = new Date();
    expect(getTodayISODate()).toBe(formatDateToIsoDate(now));
  });
});

describe("getDaysBetweenDates counts calendar days", () => {
  it("day boundaries crossed, not elapsed 24h blocks ceil'd", () => {
    // 26 elapsed hours but exactly 1 boundary crossed — the old ceil said 2.
    expect(
      getDaysBetweenDates(new Date(2024, 0, 1, 23, 0), new Date(2024, 0, 2, 1, 0)),
    ).toBe(1);
    expect(getDaysBetweenDates(new Date(2024, 0, 1), new Date(2024, 0, 15))).toBe(14);
  });
});

describe("relative time via Intl", () => {
  it("formats past and future, long and short", () => {
    expect(formatDateToRelative(new Date(Date.now() - 7_200_000), "en")).toBe(
      "2 hours ago",
    );
    expect(formatDateToRelative(new Date(Date.now() + 7_200_000), "en")).toBe(
      "in 2 hours",
    );
    expect(formatDateToRelativeShort(new Date(Date.now() - 300_000))).toBe("5m ago");
    expect(formatDateToRelativeShort(new Date(Date.now() + 259_200_000))).toBe("in 3d");
    expect(formatMillisToRelative(Date.now() - 7_200_000, "en")).toBe("2 hours ago");
  });
});

describe("the conversion matrix is closed", () => {
  it("round-trips ISO → millis → ISO", () => {
    const iso = "2024-01-15T10:30:00.000Z";
    expect(convertMillisToISOString(convertISOStringToMillis(iso) as number)).toBe(iso);
  });

  it("returns null, not NaN, for garbage", () => {
    expect(convertISOStringToMillis("not a date")).toBeNull();
  });
});

describe("smaller units and boundaries", () => {
  it("adds hours and minutes to a Date", () => {
    const base = new Date(2024, 0, 15, 10, 0);
    expect(addHoursToDate(base, 3).getHours()).toBe(13);
    expect(addMinutesToDate(base, 45).getMinutes()).toBe(45);
    expect(base.getHours()).toBe(10); // untouched
  });

  it("month boundaries in millis", () => {
    const mid = new Date(2024, 0, 15, 12).getTime();
    expect(new Date(getStartOfMonthMillis(mid)).getDate()).toBe(1);
    expect(new Date(getEndOfMonthMillis(mid)).getDate()).toBe(31);
  });
});

describe("today checks across representations", () => {
  it("agrees for now and disagrees for yesterday", () => {
    expect(isISODateToday(new Date().toISOString())).toBe(true);
    expect(isMillisToday(Date.now())).toBe(true);
    expect(isMillisToday(Date.now() - 86_400_000 * 2)).toBe(false);
  });
});

describe("odds and ends", () => {
  it("compareDates sorts ascending", () => {
    const a = new Date(2024, 0, 1);
    const b = new Date(2024, 5, 1);
    expect([b, a].sort(compareDates)).toEqual([a, b]);
  });

  it("getNextWeekdayDate lands on the asked weekday, never in the past", () => {
    const friday = getNextWeekdayDate(5);
    expect(friday.getDay()).toBe(5);
    expect(addDaysToDate(friday, 1) > new Date()).toBe(true);
  });

  it("validators", () => {
    expect(isValidDate(new Date("nope"))).toBe(false);
    expect(isValidISODate("2024-01-15")).toBe(true);
    expect(isValidISODate("15/01/2024")).toBe(false);
  });
});

describe("add/subtract symmetry", () => {
  it("every add* has a subtract* mirror, and they invert each other", async () => {
    const api = await import("./index.js");
    const adds = Object.keys(api).filter((k) => k.startsWith("add"));
    for (const add of adds) {
      const mirror = add.replace(/^add(\w+?)To/, "subtract$1From");
      expect(api, `${add} has no ${mirror}`).toHaveProperty(mirror);
    }
    expect(adds.length).toBeGreaterThanOrEqual(15);
  });

  it("subtract inverts add across all three representations", async () => {
    const api = await import("./index.js");
    const date = new Date(2024, 5, 15, 12);
    expect(api.subtractMonthsFromDate(api.addMonthsToDate(date, 3), 3).getTime()).toBe(
      date.getTime(),
    );
    const iso = "2024-06-15T12:00:00.000Z";
    expect(api.subtractHoursFromISODate(api.addHoursToISODate(iso, 5), 5)).toBe(iso);
    const millis = date.getTime();
    expect(api.subtractYearsFromMillis(api.addYearsToMillis(millis, 2), 2)).toBe(millis);
  });
});
