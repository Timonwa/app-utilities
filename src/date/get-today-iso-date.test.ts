import { describe, expect, it } from "vitest";
import { formatDateToIsoDate, getTodayISODate } from "./index.js";

describe("local calendar dates, never UTC-shifted", () => {
  it("today's ISO date matches local now", () => {
    const now = new Date();
    expect(getTodayISODate()).toBe(formatDateToIsoDate(now));
  });

  it("always has the YYYY-MM-DD shape", () => {
    expect(getTodayISODate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
