import { describe, expect, it } from "vitest";
import { subtractDaysFromISODate } from "./index.js";

describe("subtractDaysFromISODate", () => {
  it("subtracts days and returns a full ISO string", () => {
    expect(subtractDaysFromISODate("2024-01-15T00:00:00.000Z", 5)).toBe(
      "2024-01-10T00:00:00.000Z",
    );
  });

  it("rolls back over the month boundary", () => {
    expect(subtractDaysFromISODate("2024-02-01T12:00:00.000Z", 2)).toBe(
      "2024-01-30T12:00:00.000Z",
    );
  });

  it("adds with a negative amount", () => {
    expect(subtractDaysFromISODate("2024-01-15T06:00:00.000Z", -5)).toBe(
      "2024-01-20T06:00:00.000Z",
    );
  });
});
