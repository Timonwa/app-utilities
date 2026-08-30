import { describe, expect, it } from "vitest";
import { isValidDate, isValidISODate } from "./index.js";

describe("validators", () => {
  it("rejects invalid dates and non-ISO strings", () => {
    expect(isValidDate(new Date("nope"))).toBe(false);
    expect(isValidISODate("2024-01-15")).toBe(true);
    expect(isValidISODate("15/01/2024")).toBe(false);
  });

  it("rejects a month that cannot exist", () => {
    expect(isValidISODate("2024-13-01")).toBe(false);
  });

  it("rejects datetimes and unpadded dates — the shape is strict", () => {
    expect(isValidISODate("2024-01-15T10:00:00Z")).toBe(false);
    expect(isValidISODate("2024-1-5")).toBe(false);
  });

  it("accepts a leap day", () => {
    expect(isValidISODate("2024-02-29")).toBe(true);
  });

  it("rejects a day that does not exist in its month", () => {
    expect(isValidISODate("2024-02-31")).toBe(false);
    expect(isValidISODate("2023-02-29")).toBe(false);
  });
});
