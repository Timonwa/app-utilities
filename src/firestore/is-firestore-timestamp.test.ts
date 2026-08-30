import { describe, expect, it } from "vitest";
import { makeTimestampLike, SECONDS } from "./_test-helpers.js";
import { isFirestoreTimestamp } from "./index.js";

describe("isFirestoreTimestamp", () => {
  it("accepts a live Timestamp-shaped instance", () => {
    expect(isFirestoreTimestamp(makeTimestampLike(SECONDS))).toBe(true);
  });
  it("rejects serialized wire shapes — those are data, not a Timestamp", () => {
    expect(isFirestoreTimestamp({ _seconds: SECONDS, _nanoseconds: 0 })).toBe(false);
  });
  it("rejects null, dates, and part-shaped objects", () => {
    expect(isFirestoreTimestamp(null)).toBe(false);
    expect(isFirestoreTimestamp(new Date())).toBe(false);
    expect(isFirestoreTimestamp({ seconds: 1, nanoseconds: 0 })).toBe(false);
  });
});
