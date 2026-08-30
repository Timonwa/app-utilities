import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatISOToRelativeShort } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("formatISOToRelativeShort", () => {
  it("formats past and future compactly", () => {
    expect(formatISOToRelativeShort(new Date(2024, 0, 15, 11, 55).toISOString())).toBe(
      "5m ago",
    );
    expect(formatISOToRelativeShort(new Date(2024, 0, 18, 12).toISOString())).toBe(
      "in 3d",
    );
  });

  it("returns an empty string for invalid or empty input", () => {
    expect(formatISOToRelativeShort("not a date")).toBe("");
    expect(formatISOToRelativeShort("")).toBe("");
  });
});
