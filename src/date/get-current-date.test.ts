import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentDate } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getCurrentDate", () => {
  it("returns now as a Date", () => {
    expect(getCurrentDate().getTime()).toBe(new Date(2024, 0, 15, 12).getTime());
  });

  it("is evaluated at call time, not cached", () => {
    const first = getCurrentDate();
    vi.advanceTimersByTime(60_000);
    expect(getCurrentDate().getTime() - first.getTime()).toBe(60_000);
  });
});
