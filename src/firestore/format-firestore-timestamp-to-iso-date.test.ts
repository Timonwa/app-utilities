import { describe, expect, it } from "vitest";
import { formatFirestoreTimestampToIsoDate } from "./index.js";

describe("formatFirestoreTimestampToIsoDate", () => {
  it("returns the LOCAL calendar date as YYYY-MM-DD", () => {
    expect(formatFirestoreTimestampToIsoDate(new Date(2024, 0, 15, 23, 30))).toBe(
      "2024-01-15",
    );
  });

  it("accepts underscore-prefixed wire shapes", () => {
    const local = new Date(2024, 0, 15, 12, 0);
    expect(
      formatFirestoreTimestampToIsoDate({
        _seconds: Math.floor(local.getTime() / 1000),
        _nanoseconds: 0,
      }),
    ).toBe("2024-01-15");
  });

  it("returns the default fallback for unparseable input", () => {
    expect(formatFirestoreTimestampToIsoDate("junk")).toBe("—");
    expect(formatFirestoreTimestampToIsoDate(null)).toBe("—");
  });

  it("honours a custom fallback", () => {
    expect(formatFirestoreTimestampToIsoDate(undefined, "never")).toBe("never");
  });
});
