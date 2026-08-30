import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isMillisInFuture } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-01-15T00:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isMillisInFuture", () => {
  it("returns true strictly after now", () => {
    expect(isMillisInFuture(1_705_276_800_001)).toBe(true);
  });

  it("returns false for now itself and the past", () => {
    expect(isMillisInFuture(1_705_276_800_000)).toBe(false);
    expect(isMillisInFuture(1_705_276_799_999)).toBe(false);
  });
});
