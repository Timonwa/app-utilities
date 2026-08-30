import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isDateInFuture } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isDateInFuture", () => {
  it("returns true strictly after now", () => {
    expect(isDateInFuture(new Date(2024, 0, 15, 12, 0, 1))).toBe(true);
  });

  it("returns false for now itself and the past", () => {
    expect(isDateInFuture(new Date(2024, 0, 15, 12, 0, 0))).toBe(false);
    expect(isDateInFuture(new Date(2024, 0, 15, 11, 59))).toBe(false);
  });
});
