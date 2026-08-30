import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isMillisInPast } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-01-15T00:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isMillisInPast", () => {
  it("returns true strictly before now", () => {
    expect(isMillisInPast(1_705_276_799_999)).toBe(true);
  });

  it("returns false for now itself and the future", () => {
    expect(isMillisInPast(1_705_276_800_000)).toBe(false);
    expect(isMillisInPast(1_705_276_800_001)).toBe(false);
  });
});
