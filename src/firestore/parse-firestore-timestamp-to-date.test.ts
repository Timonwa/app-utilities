import { describe, expect, it } from "vitest";
import { MILLIS, SECONDS } from "./_test-helpers.js";
import { parseFirestoreTimestampToDate } from "./index.js";

describe("parseFirestoreTimestampToDate", () => {
  it("parses the serialized { _seconds, _nanoseconds } wire shape", () => {
    expect(
      parseFirestoreTimestampToDate({ _seconds: SECONDS, _nanoseconds: 0 })?.getTime(),
    ).toBe(MILLIS);
  });
  it("parses the SDK { seconds, nanoseconds } shape", () => {
    expect(
      parseFirestoreTimestampToDate({ seconds: SECONDS, nanoseconds: 0 })?.getTime(),
    ).toBe(MILLIS);
  });
  it("converts nanoseconds to whole milliseconds", () => {
    expect(
      parseFirestoreTimestampToDate({
        seconds: SECONDS,
        nanoseconds: 1_500_000,
      })?.getTime(),
    ).toBe(MILLIS + 1);
  });
  it("passes a Date through and treats a number as millis", () => {
    const date = new Date(MILLIS);
    expect(parseFirestoreTimestampToDate(date)).toBe(date);
    expect(parseFirestoreTimestampToDate(MILLIS)?.getTime()).toBe(MILLIS);
  });
  it("never guesses: null, undefined, strings, NaN, and shapeless objects parse to null", () => {
    expect(parseFirestoreTimestampToDate(null)).toBeNull();
    expect(parseFirestoreTimestampToDate(undefined)).toBeNull();
    expect(parseFirestoreTimestampToDate("2024-01-15")).toBeNull();
    expect(parseFirestoreTimestampToDate(Number.NaN)).toBeNull();
    expect(parseFirestoreTimestampToDate({ sec: SECONDS })).toBeNull();
  });
});
