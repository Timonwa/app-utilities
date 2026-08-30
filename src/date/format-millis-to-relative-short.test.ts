import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatMillisToRelativeShort } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("formatMillisToRelativeShort", () => {
  it("formats past and future compactly", () => {
    expect(formatMillisToRelativeShort(new Date(2024, 0, 15, 11, 55).getTime())).toBe(
      "5m ago",
    );
    expect(formatMillisToRelativeShort(new Date(2024, 0, 18, 12).getTime())).toBe(
      "in 3d",
    );
  });

  it("returns an empty string for non-finite input", () => {
    expect(formatMillisToRelativeShort(Number.NaN)).toBe("");
    expect(formatMillisToRelativeShort(Number.POSITIVE_INFINITY)).toBe("");
  });
});
