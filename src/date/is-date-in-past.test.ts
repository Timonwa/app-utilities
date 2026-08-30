import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isDateInPast } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isDateInPast", () => {
  it("returns true strictly before now", () => {
    expect(isDateInPast(new Date(2024, 0, 15, 11, 59, 59))).toBe(true);
  });

  it("returns false for now itself and the future", () => {
    expect(isDateInPast(new Date(2024, 0, 15, 12, 0, 0))).toBe(false);
    expect(isDateInPast(new Date(2024, 0, 15, 12, 1))).toBe(false);
  });
});
