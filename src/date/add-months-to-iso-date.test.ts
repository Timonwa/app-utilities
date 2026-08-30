import { describe, expect, it } from "vitest";
import { addMonthsToISODate, addMonthsToMillis } from "./index.js";

describe("calendar arithmetic clamps instead of overflowing", () => {
  it("works identically through the ISO and millis representations", () => {
    // Built from and read back as local components: the arithmetic is local-calendar,
    // so a fixed midnight-UTC string would land on the wrong day west of Greenwich.
    const jan31 = new Date(2024, 0, 31);
    const viaIso = new Date(addMonthsToISODate(jan31.toISOString(), 1));
    expect([viaIso.getMonth(), viaIso.getDate()]).toEqual([1, 29]);
    const clamped = new Date(addMonthsToMillis(jan31.getTime(), 1));
    expect(clamped.getDate()).toBe(29);
  });

  it("lands on the same day the next month for mid-month dates", () => {
    // Date-prefix assertion: a DST change between the months can shift the hour.
    expect(addMonthsToISODate("2024-01-15T12:00:00.000Z", 1)).toContain("2024-02-15");
  });

  it("subtracts with a negative amount", () => {
    expect(addMonthsToISODate("2024-03-15T12:00:00.000Z", -1)).toContain("2024-02-15");
  });
});
