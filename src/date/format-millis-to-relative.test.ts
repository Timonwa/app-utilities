import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatMillisToRelative } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("formatMillisToRelative", () => {
  it("formats past and future through Intl", () => {
    expect(formatMillisToRelative(new Date(2024, 0, 15, 10).getTime(), "en")).toBe(
      "2 hours ago",
    );
    expect(formatMillisToRelative(new Date(2024, 0, 18, 12).getTime(), "en")).toBe(
      "in 3 days",
    );
  });

  it("returns an empty string for non-finite input", () => {
    expect(formatMillisToRelative(Number.NaN)).toBe("");
  });
});
