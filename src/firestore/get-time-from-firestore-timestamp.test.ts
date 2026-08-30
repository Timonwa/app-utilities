import { describe, expect, it } from "vitest";
import { getTimeFromFirestoreTimestamp } from "./index.js";

describe("getTimeFromFirestoreTimestamp", () => {
  it("returns the local HH:MM:SS", () => {
    expect(getTimeFromFirestoreTimestamp(new Date(2024, 0, 15, 15, 30, 45))).toBe(
      "15:30:45",
    );
  });

  it("zero-pads each segment", () => {
    expect(getTimeFromFirestoreTimestamp(new Date(2024, 0, 15, 5, 3, 7))).toBe(
      "05:03:07",
    );
  });

  it("returns the default fallback for unparseable input", () => {
    expect(getTimeFromFirestoreTimestamp({})).toBe("—");
    expect(getTimeFromFirestoreTimestamp("junk")).toBe("—");
  });

  it("honours a custom fallback", () => {
    expect(getTimeFromFirestoreTimestamp(null, "--:--")).toBe("--:--");
  });
});
