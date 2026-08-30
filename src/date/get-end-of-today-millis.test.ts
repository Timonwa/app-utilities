import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getEndOfTodayMillis } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 10, 30));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getEndOfTodayMillis", () => {
  it("returns the last millisecond of today's local day", () => {
    expect(getEndOfTodayMillis()).toBe(new Date(2024, 0, 15, 23, 59, 59, 999).getTime());
  });

  it("is always at or after now", () => {
    expect(getEndOfTodayMillis()).toBeGreaterThanOrEqual(Date.now());
  });
});
