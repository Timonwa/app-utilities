import { describe, expect, it } from "vitest";
import { formatFirestoreTimestampToReadableDateTime } from "./index.js";

describe("formatFirestoreTimestampToReadableDateTime", () => {
  it("includes the long date and the time", () => {
    const formatted = formatFirestoreTimestampToReadableDateTime(
      new Date(2024, 0, 15, 15, 30),
    );
    expect(formatted).toContain("January 15, 2024");
    expect(formatted).toContain("3:30");
  });

  it("localises through the locale option", () => {
    expect(
      formatFirestoreTimestampToReadableDateTime(new Date(2024, 0, 15, 12), {
        locale: "fr",
      }),
    ).toContain("janvier");
  });

  it("returns the default fallback for unparseable input", () => {
    expect(formatFirestoreTimestampToReadableDateTime("junk")).toBe("—");
  });

  it("honours a custom fallback", () => {
    expect(formatFirestoreTimestampToReadableDateTime(null, { fallback: "n/a" })).toBe(
      "n/a",
    );
  });
});
