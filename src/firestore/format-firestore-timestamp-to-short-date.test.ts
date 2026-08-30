import { describe, expect, it } from "vitest";
import { formatFirestoreTimestampToShortDate } from "./index.js";

describe("formatFirestoreTimestampToShortDate", () => {
  it("formats a numeric short date for the given locale", () => {
    expect(
      formatFirestoreTimestampToShortDate(new Date(2024, 0, 15, 12), {
        locale: "en-US",
      }),
    ).toBe("1/15/24");
  });

  it("respects day-first locales", () => {
    expect(
      formatFirestoreTimestampToShortDate(new Date(2024, 0, 15, 12), {
        locale: "en-GB",
      }),
    ).toBe("15/01/24");
  });

  it("returns the default fallback for unparseable input", () => {
    expect(formatFirestoreTimestampToShortDate("junk")).toBe("—");
  });

  it("honours a custom fallback", () => {
    expect(formatFirestoreTimestampToShortDate(null, { fallback: "n/a" })).toBe("n/a");
  });
});
