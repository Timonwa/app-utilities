import { describe, expect, it } from "vitest";
import { isValidISODateString } from "./index.js";

describe("isValidISODateString", () => {
  it("accepts parseable ISO date-time strings", () => {
    expect(isValidISODateString("2024-01-15T10:30:00.000Z")).toBe(true);
    expect(isValidISODateString("2024-01-15T10:30:00")).toBe(true);
  });

  it("rejects date-only strings — a date-time needs the T", () => {
    expect(isValidISODateString("2024-01-15")).toBe(false);
  });

  it("rejects unparseable strings", () => {
    expect(isValidISODateString("not a date")).toBe(false);
    expect(isValidISODateString("")).toBe(false);
    expect(isValidISODateString("2024-99-99T00:00:00.000Z")).toBe(false);
  });
});
