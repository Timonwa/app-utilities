import { describe, expect, it } from "vitest";
import {
  convertFirestoreTimestampToDateTimeLocal,
  getFirestoreTimestampSortMillis,
  isFirestoreTimestamp,
  parseFirestoreTimestampToDate,
} from "./index.js";

const MILLIS = 1_705_276_800_000; // 2024-01-15T00:00:00.000Z
const SECONDS = MILLIS / 1000;

function makeTimestampLike(seconds: number, nanoseconds = 0) {
  return {
    seconds,
    nanoseconds,
    toDate: () => new Date(seconds * 1000 + Math.floor(nanoseconds / 1_000_000)),
    toMillis: () => seconds * 1000 + Math.floor(nanoseconds / 1_000_000),
  };
}

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

describe("convertFirestoreTimestampToDateTimeLocal", () => {
  it("produces the local-time YYYY-MM-DDTHH:mm value datetime-local expects", () => {
    const local = new Date(2026, 8, 23, 10, 30); // constructed in local time on purpose
    expect(convertFirestoreTimestampToDateTimeLocal(local)).toBe("2026-09-23T10:30");
  });
  it("returns an empty string for anything unparseable", () => {
    expect(convertFirestoreTimestampToDateTimeLocal(null)).toBe("");
    expect(convertFirestoreTimestampToDateTimeLocal({})).toBe("");
  });
});

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
