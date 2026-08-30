import { describe, expect, it } from "vitest";
import { MILLIS, makeTimestampLike, SECONDS } from "./_test-helpers.js";
import { getFirestoreTimestampSortMillis } from "./index.js";

describe("getFirestoreTimestampSortMillis", () => {
  it("prefers a live toMillis over shape parsing", () => {
    expect(getFirestoreTimestampSortMillis(makeTimestampLike(SECONDS))).toBe(MILLIS);
  });
  it("parses wire shapes", () => {
    expect(getFirestoreTimestampSortMillis({ _seconds: SECONDS })).toBe(MILLIS);
  });
  it("returns the 0 sentinel for garbage, so sorts never branch", () => {
    expect(getFirestoreTimestampSortMillis(undefined)).toBe(0);
    expect(getFirestoreTimestampSortMillis("soon")).toBe(0);
  });
});
