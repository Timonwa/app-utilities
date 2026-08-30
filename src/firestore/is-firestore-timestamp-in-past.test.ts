import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createSerializedFirestoreTimestampFromDate,
  isFirestoreTimestampInPast,
} from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isFirestoreTimestampInPast", () => {
  it("returns true for a past instant", () => {
    expect(isFirestoreTimestampInPast(new Date(2024, 0, 15, 11, 59))).toBe(true);
    expect(
      isFirestoreTimestampInPast(
        createSerializedFirestoreTimestampFromDate(new Date(2023, 11, 31)),
      ),
    ).toBe(true);
  });

  it("returns false for a future instant", () => {
    expect(isFirestoreTimestampInPast(new Date(2024, 0, 15, 12, 1))).toBe(false);
  });

  it("returns false for unparseable values instead of guessing", () => {
    expect(isFirestoreTimestampInPast("junk")).toBe(false);
    expect(isFirestoreTimestampInPast(null)).toBe(false);
    expect(isFirestoreTimestampInPast({})).toBe(false);
  });
});
