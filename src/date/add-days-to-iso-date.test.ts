import { describe, expect, it } from "vitest";
import { addDaysToISODate } from "./index.js";

describe("addDaysToISODate", () => {
  it("adds days and returns a full ISO string", () => {
    expect(addDaysToISODate("2024-01-15T00:00:00.000Z", 5)).toBe(
      "2024-01-20T00:00:00.000Z",
    );
  });

  it("preserves the time-of-day portion", () => {
    expect(addDaysToISODate("2024-01-15T10:30:45.123Z", 1)).toBe(
      "2024-01-16T10:30:45.123Z",
    );
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    expect(addDaysToISODate("2024-01-15T06:00:00.000Z", -5)).toBe(
      "2024-01-10T06:00:00.000Z",
    );
    expect(addDaysToISODate("2024-01-15T06:00:00.000Z", 0)).toBe(
      "2024-01-15T06:00:00.000Z",
    );
  });

  it("rolls over month boundaries", () => {
    expect(addDaysToISODate("2024-01-30T12:00:00.000Z", 3)).toBe(
      "2024-02-02T12:00:00.000Z",
    );
  });
});
