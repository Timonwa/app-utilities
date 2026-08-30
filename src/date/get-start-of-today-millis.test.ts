import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getStartOfTodayMillis } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 10, 30));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getStartOfTodayMillis", () => {
  it("returns today's local midnight", () => {
    expect(getStartOfTodayMillis()).toBe(new Date(2024, 0, 15).getTime());
  });

  it("is always at or before now", () => {
    expect(getStartOfTodayMillis()).toBeLessThanOrEqual(Date.now());
  });
});
