import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatISOToRelative } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("formatISOToRelative", () => {
  it("formats past and future through Intl", () => {
    expect(formatISOToRelative(new Date(2024, 0, 15, 10).toISOString(), "en")).toBe(
      "2 hours ago",
    );
    expect(formatISOToRelative(new Date(2024, 0, 18, 12).toISOString(), "en")).toBe(
      "in 3 days",
    );
  });

  it("localises through the locale argument", () => {
    expect(formatISOToRelative(new Date(2024, 0, 15, 10).toISOString(), "fr")).toBe(
      "il y a 2 heures",
    );
  });

  it("returns an empty string for invalid or empty input", () => {
    expect(formatISOToRelative("junk")).toBe("");
    expect(formatISOToRelative("")).toBe("");
  });
});
