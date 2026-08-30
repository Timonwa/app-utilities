import { describe, expect, it } from "vitest";
import { SECONDS } from "./_test-helpers.js";
import {
  isFirestoreTimestampInFuture,
  isFirestoreTimestampInPast,
  isFirestoreTimestampToday,
} from "./index.js";

describe("compare and checks", () => {
  it("in-future / in-past / today never guess on garbage", () => {
    expect(isFirestoreTimestampInFuture(Date.now() + 60_000)).toBe(true);
    expect(isFirestoreTimestampInPast({ seconds: SECONDS })).toBe(true);
    expect(isFirestoreTimestampToday(new Date())).toBe(true);
    expect(isFirestoreTimestampInFuture("junk")).toBe(false);
    expect(isFirestoreTimestampInPast(null)).toBe(false);
    expect(isFirestoreTimestampToday(undefined)).toBe(false);
  });

  it("accepts a future serialized shape", () => {
    expect(
      isFirestoreTimestampInFuture({ seconds: Math.floor(Date.now() / 1000) + 3600 }),
    ).toBe(true);
  });

  it("a past moment is not in the future", () => {
    expect(isFirestoreTimestampInFuture(Date.now() - 60_000)).toBe(false);
  });
});
