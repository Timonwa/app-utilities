import { describe, expect, it } from "vitest";
import {
  formatFirestoreTimestampToRelative,
  formatFirestoreTimestampToRelativeShort,
} from "./index.js";

describe("format family", () => {
  it("formats relative time in both lengths", () => {
    const twoHoursAgo = Date.now() - 7_200_000;
    expect(formatFirestoreTimestampToRelative(twoHoursAgo)).toContain("2 hours ago");
    expect(formatFirestoreTimestampToRelativeShort(twoHoursAgo)).toBe("2h ago");
  });

  it("formats future moments and other locales", () => {
    expect(formatFirestoreTimestampToRelative(Date.now() + 7_200_000)).toBe("in 2 hours");
    expect(
      formatFirestoreTimestampToRelative(Date.now() - 7_200_000, { locale: "fr" }),
    ).toBe("il y a 2 heures");
  });

  it("falls back to an em dash for the unparseable by default", () => {
    expect(formatFirestoreTimestampToRelative("junk")).toBe("—");
  });
});
