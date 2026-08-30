import { describe, expect, it } from "vitest";
import { formatDateToIsoDate } from "./index.js";

describe("local calendar dates, never UTC-shifted", () => {
  // toISOString() converts to UTC first — near midnight that is a different day.
  it("formats the LOCAL date", () => {
    expect(formatDateToIsoDate(new Date(2024, 0, 15, 0, 30))).toBe("2024-01-15");
  });

  it("zero-pads single-digit months and days", () => {
    expect(formatDateToIsoDate(new Date(2024, 8, 5))).toBe("2024-09-05");
  });

  it("stays on the local day right up to midnight", () => {
    expect(formatDateToIsoDate(new Date(2024, 0, 15, 23, 59, 59))).toBe("2024-01-15");
  });
});
