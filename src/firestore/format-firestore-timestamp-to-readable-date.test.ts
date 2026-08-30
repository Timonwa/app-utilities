import { describe, expect, it } from "vitest";
import { SECONDS } from "./_test-helpers.js";
import {
  formatFirestoreTimestampToIsoDate,
  formatFirestoreTimestampToOrdinalDate,
  formatFirestoreTimestampToReadableDate,
  formatFirestoreTimestampToReadableDateTime,
  formatFirestoreTimestampToRelative,
  formatFirestoreTimestampToShortDate,
  getTimeFromFirestoreTimestamp,
} from "./index.js";

describe("format family", () => {
  const wire = { _seconds: SECONDS, _nanoseconds: 0 };
  it("formats readable, short, iso, ordinal, and time from wire shapes", () => {
    expect(formatFirestoreTimestampToReadableDate(wire)).toContain("January");
    expect(formatFirestoreTimestampToReadableDateTime(wire)).toContain("2024");
    expect(formatFirestoreTimestampToShortDate(wire, { locale: "en-US" })).toContain(
      "24",
    );
    expect(formatFirestoreTimestampToIsoDate(new Date(2024, 0, 15))).toBe("2024-01-15");
    expect(formatFirestoreTimestampToOrdinalDate(wire)).toContain("Jan");
    expect(getTimeFromFirestoreTimestamp(new Date(2024, 0, 15, 15, 30, 45))).toBe(
      "15:30:45",
    );
  });
  it("every formatter degrades to its fallback instead of throwing", () => {
    expect(formatFirestoreTimestampToReadableDate("junk")).toBe("—");
    expect(formatFirestoreTimestampToRelative(null, { fallback: "n/a" })).toBe("n/a");
    expect(formatFirestoreTimestampToIsoDate(undefined, "never")).toBe("never");
    expect(getTimeFromFirestoreTimestamp({}, "--:--")).toBe("--:--");
  });

  it("localises through the locale option", () => {
    expect(
      formatFirestoreTimestampToReadableDate(new Date(2024, 0, 15), { locale: "fr" }),
    ).toBe("15 janvier 2024");
  });
});
