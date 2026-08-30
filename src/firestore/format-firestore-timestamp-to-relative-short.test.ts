import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatFirestoreTimestampToRelativeShort } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("formatFirestoreTimestampToRelativeShort", () => {
  it("formats a past instant compactly", () => {
    expect(formatFirestoreTimestampToRelativeShort(new Date(2024, 0, 15, 11, 55))).toBe(
      "5m ago",
    );
  });

  it("formats a future instant compactly", () => {
    expect(formatFirestoreTimestampToRelativeShort(new Date(2024, 0, 18, 12))).toBe(
      "in 3d",
    );
  });

  it("returns the fallback for unparseable input", () => {
    expect(formatFirestoreTimestampToRelativeShort("junk")).toBe("—");
    expect(formatFirestoreTimestampToRelativeShort(null, "n/a")).toBe("n/a");
  });
});
