import { describe, expect, it } from "vitest";
import { addMonthsToDate, formatDateToIsoDate } from "./index.js";

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

  it("keeps the day when the target month has room", () => {
    expect(formatDateToIsoDate(addMonthsToDate(new Date(2024, 0, 15), 1))).toBe(
      "2024-02-15",
    );
  });

  it("clamps going backwards too", () => {
    expect(formatDateToIsoDate(addMonthsToDate(new Date(2024, 2, 31), -1))).toBe(
      "2024-02-29",
    );
  });

  it("does not mutate the input date", () => {
    const base = new Date(2024, 0, 31);
    addMonthsToDate(base, 1);
    expect(base.getDate()).toBe(31);
  });
});
