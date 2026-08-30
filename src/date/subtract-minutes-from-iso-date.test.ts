import { describe, expect, it } from "vitest";
import { subtractMinutesFromISODate } from "./index.js";

describe("subtractMinutesFromISODate", () => {
  it("subtracts minutes and returns a full ISO string", () => {
    expect(subtractMinutesFromISODate("2024-01-15T10:30:00.000Z", 30)).toBe(
      "2024-01-15T10:00:00.000Z",
    );
  });

  it("rolls back over the hour boundary", () => {
    expect(subtractMinutesFromISODate("2024-01-15T10:10:00.000Z", 20)).toBe(
      "2024-01-15T09:50:00.000Z",
    );
  });

  it("adds with a negative amount", () => {
    expect(subtractMinutesFromISODate("2024-01-15T10:00:00.000Z", -30)).toBe(
      "2024-01-15T10:30:00.000Z",
    );
  });
});
