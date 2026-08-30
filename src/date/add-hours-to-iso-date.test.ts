import { describe, expect, it } from "vitest";
import { addHoursToISODate } from "./index.js";

describe("addHoursToISODate", () => {
  it("adds hours and returns a full ISO string", () => {
    expect(addHoursToISODate("2024-01-15T10:00:00.000Z", 3)).toBe(
      "2024-01-15T13:00:00.000Z",
    );
  });

  it("rolls over the day boundary", () => {
    expect(addHoursToISODate("2024-01-15T23:00:00.000Z", 2)).toBe(
      "2024-01-16T01:00:00.000Z",
    );
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    expect(addHoursToISODate("2024-01-15T10:00:00.000Z", -3)).toBe(
      "2024-01-15T07:00:00.000Z",
    );
    expect(addHoursToISODate("2024-01-15T10:00:00.000Z", 0)).toBe(
      "2024-01-15T10:00:00.000Z",
    );
  });
});
