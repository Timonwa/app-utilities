import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isISODateToday } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isISODateToday", () => {
  it("returns true for an instant within today's local day", () => {
    expect(isISODateToday(new Date(2024, 0, 15, 9, 0).toISOString())).toBe(true);
  });

  it("returns false for yesterday and tomorrow", () => {
    expect(isISODateToday(new Date(2024, 0, 14, 12).toISOString())).toBe(false);
    expect(isISODateToday(new Date(2024, 0, 16, 12).toISOString())).toBe(false);
  });

  it("returns false for garbage input instead of throwing", () => {
    expect(isISODateToday("junk")).toBe(false);
    expect(isISODateToday("")).toBe(false);
  });
});
