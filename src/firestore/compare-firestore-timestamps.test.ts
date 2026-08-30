import { describe, expect, it } from "vitest";
import { MILLIS, SECONDS } from "./_test-helpers.js";
import { compareFirestoreTimestamps } from "./index.js";

describe("compareFirestoreTimestamps", () => {
  it("sorts mixed shapes ascending, with garbage first as the 0 sentinel", () => {
    const earlier = { _seconds: SECONDS };
    const later = new Date(MILLIS + 1000);
    expect([later, earlier, "junk"].sort(compareFirestoreTimestamps)).toEqual([
      "junk",
      earlier,
      later,
    ]);
  });

  it("returns the -1/0/1 contract for equal instants across shapes", () => {
    const wire = { seconds: SECONDS, nanoseconds: 0 };
    expect(compareFirestoreTimestamps(wire, new Date(MILLIS))).toBe(0);
    expect(compareFirestoreTimestamps(wire, new Date(MILLIS + 1))).toBe(-1);
    expect(compareFirestoreTimestamps(new Date(MILLIS + 1), wire)).toBe(1);
  });
});
