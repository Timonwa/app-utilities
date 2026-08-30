import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentMillis } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-01-15T00:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getCurrentMillis", () => {
  it("returns Date.now()", () => {
    expect(getCurrentMillis()).toBe(1_705_276_800_000);
  });

  it("moves with the clock", () => {
    vi.advanceTimersByTime(250);
    expect(getCurrentMillis()).toBe(1_705_276_800_250);
  });
});
