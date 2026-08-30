import { describe, expect, it } from "vitest";
import { subtractHoursFromISODate } from "./index.js";

describe("subtractHoursFromISODate", () => {
  it("subtracts hours and returns a full ISO string", () => {
    expect(subtractHoursFromISODate("2024-01-15T10:00:00.000Z", 2)).toBe(
      "2024-01-15T08:00:00.000Z",
    );
  });

  it("rolls back over the day boundary", () => {
    expect(subtractHoursFromISODate("2024-01-15T01:00:00.000Z", 3)).toBe(
      "2024-01-14T22:00:00.000Z",
    );
  });

  it("adds with a negative amount", () => {
    expect(subtractHoursFromISODate("2024-01-15T10:00:00.000Z", -2)).toBe(
      "2024-01-15T12:00:00.000Z",
    );
  });
});
