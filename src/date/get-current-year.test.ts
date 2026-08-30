import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentYear } from "./index.js";

afterEach(() => {
  vi.useRealTimers();
});

beforeEach(() => {
  vi.useFakeTimers();
});

describe("getCurrentYear", () => {
  it("returns the local full year", () => {
    vi.setSystemTime(new Date(2024, 5, 15));
    expect(getCurrentYear()).toBe(2024);
  });

  it("is evaluated at call time, so it survives New Year", () => {
    vi.setSystemTime(new Date(2024, 11, 31, 23, 59));
    expect(getCurrentYear()).toBe(2024);
    vi.setSystemTime(new Date(2025, 0, 1, 0, 1));
    expect(getCurrentYear()).toBe(2025);
  });
});
