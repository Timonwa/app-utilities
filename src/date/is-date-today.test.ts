import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isDateToday } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isDateToday", () => {
  it("returns true across the whole local day", () => {
    expect(isDateToday(new Date(2024, 0, 15, 0, 0, 1))).toBe(true);
    expect(isDateToday(new Date(2024, 0, 15, 23, 59, 59))).toBe(true);
  });

  it("returns false for yesterday and tomorrow", () => {
    expect(isDateToday(new Date(2024, 0, 14, 23, 59))).toBe(false);
    expect(isDateToday(new Date(2024, 0, 16, 0, 1))).toBe(false);
  });

  it("returns false for the same day in a different year", () => {
    expect(isDateToday(new Date(2023, 0, 15, 12))).toBe(false);
  });
});
