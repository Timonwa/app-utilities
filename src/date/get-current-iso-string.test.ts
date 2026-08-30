import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentISOString } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-01-15T10:30:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getCurrentISOString", () => {
  it("returns now as a full ISO string", () => {
    expect(getCurrentISOString()).toBe("2024-01-15T10:30:00.000Z");
  });

  it("moves with the clock", () => {
    vi.advanceTimersByTime(1500);
    expect(getCurrentISOString()).toBe("2024-01-15T10:30:01.500Z");
  });
});
