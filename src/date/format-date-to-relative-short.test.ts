import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatDateToRelativeShort } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("formatDateToRelativeShort", () => {
  it("formats past instants compactly per unit", () => {
    expect(formatDateToRelativeShort(new Date(2024, 0, 15, 11, 55))).toBe("5m ago");
    expect(formatDateToRelativeShort(new Date(2024, 0, 15, 10, 0))).toBe("2h ago");
    expect(formatDateToRelativeShort(new Date(2024, 0, 12, 12, 0))).toBe("3d ago");
  });

  it("formats future instants with the in prefix", () => {
    expect(formatDateToRelativeShort(new Date(2024, 0, 18, 12))).toBe("in 3d");
  });

  it("uses seconds for the immediate past", () => {
    expect(formatDateToRelativeShort(new Date(2024, 0, 15, 11, 59, 50))).toBe("10s ago");
  });

  it("climbs to months and years", () => {
    expect(formatDateToRelativeShort(new Date(2023, 10, 15, 12))).toBe("2mo ago");
    expect(formatDateToRelativeShort(new Date(2021, 0, 15, 12))).toBe("3y ago");
  });
});
