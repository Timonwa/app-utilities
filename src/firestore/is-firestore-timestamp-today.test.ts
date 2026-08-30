import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isFirestoreTimestampToday } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isFirestoreTimestampToday", () => {
  it("returns true anywhere within today's local day", () => {
    expect(isFirestoreTimestampToday(new Date(2024, 0, 15, 0, 0, 1))).toBe(true);
    expect(isFirestoreTimestampToday(new Date(2024, 0, 15, 23, 59, 59))).toBe(true);
  });

  it("returns false for yesterday and tomorrow", () => {
    expect(isFirestoreTimestampToday(new Date(2024, 0, 14, 23, 59))).toBe(false);
    expect(isFirestoreTimestampToday(new Date(2024, 0, 16, 0, 1))).toBe(false);
  });

  it("returns false for unparseable values instead of guessing", () => {
    expect(isFirestoreTimestampToday("junk")).toBe(false);
    expect(isFirestoreTimestampToday(undefined)).toBe(false);
  });
});
