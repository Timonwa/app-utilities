import { describe, expect, it } from "vitest";
import { addMinutesToISODate } from "./index.js";

describe("addMinutesToISODate", () => {
  it("adds minutes and returns a full ISO string", () => {
    expect(addMinutesToISODate("2024-01-15T10:00:00.000Z", 30)).toBe(
      "2024-01-15T10:30:00.000Z",
    );
  });

  it("rolls over the hour boundary", () => {
    expect(addMinutesToISODate("2024-01-15T10:45:00.000Z", 30)).toBe(
      "2024-01-15T11:15:00.000Z",
    );
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    expect(addMinutesToISODate("2024-01-15T10:30:00.000Z", -30)).toBe(
      "2024-01-15T10:00:00.000Z",
    );
    expect(addMinutesToISODate("2024-01-15T10:30:00.000Z", 0)).toBe(
      "2024-01-15T10:30:00.000Z",
    );
  });
});
