import { describe, expect, it } from "vitest";
import {
  compareFirestoreTimestamps,
  convertFirestoreTimestampToDate,
  convertFirestoreTimestampToDateTimeLocal,
  convertFirestoreTimestampToISOString,
  convertFirestoreTimestampToMillis,
  createSerializedFirestoreTimestampFromDate,
  createSerializedFirestoreTimestampFromMillis,
  createSerializedFirestoreTimestampNow,
  formatFirestoreTimestampToIsoDate,
  formatFirestoreTimestampToOrdinalDate,
  formatFirestoreTimestampToReadableDate,
  formatFirestoreTimestampToReadableDateTime,
  formatFirestoreTimestampToRelative,
  formatFirestoreTimestampToRelativeShort,
  formatFirestoreTimestampToShortDate,
  getFirestoreTimestampSortMillis,
  getTimeFromFirestoreTimestamp,
  isFirestoreTimestamp,
  isFirestoreTimestampInFuture,
  isFirestoreTimestampInPast,
  isFirestoreTimestampToday,
  isSerializedFirestoreTimestamp,
  isValidFirestoreTimestampInput,
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

describe("guards", () => {
  it("isSerializedFirestoreTimestamp accepts both wire spellings and rejects the rest", () => {
    expect(isSerializedFirestoreTimestamp({ seconds: SECONDS })).toBe(true);
    expect(isSerializedFirestoreTimestamp({ _seconds: SECONDS, _nanoseconds: 0 })).toBe(
      true,
    );
    expect(isSerializedFirestoreTimestamp(new Date())).toBe(false);
    expect(isSerializedFirestoreTimestamp(null)).toBe(false);
  });
  it("isValidFirestoreTimestampInput mirrors the parser", () => {
    expect(isValidFirestoreTimestampInput(MILLIS)).toBe(true);
    expect(isValidFirestoreTimestampInput("soon")).toBe(false);
  });
});

describe("exact converters", () => {
  const serialized = { seconds: SECONDS, nanoseconds: 0 };
  it("converts to Date, millis, and ISO string", () => {
    expect(convertFirestoreTimestampToDate(serialized).getTime()).toBe(MILLIS);
    expect(convertFirestoreTimestampToMillis(serialized)).toBe(MILLIS);
    expect(convertFirestoreTimestampToISOString(serialized)).toBe(
      "2024-01-15T00:00:00.000Z",
    );
  });
});

describe("serialized creators", () => {
  it("round-trips through the parser, preserving sub-second precision", () => {
    const shape = createSerializedFirestoreTimestampFromMillis(MILLIS + 500);
    expect(shape).toEqual({ seconds: SECONDS, nanoseconds: 500_000_000 });
    expect(parseFirestoreTimestampToDate(shape)?.getTime()).toBe(MILLIS + 500);
    expect(createSerializedFirestoreTimestampFromDate(new Date(MILLIS))).toEqual({
      seconds: SECONDS,
      nanoseconds: 0,
    });
  });
  it("now() is a valid parser input", () => {
    expect(isValidFirestoreTimestampInput(createSerializedFirestoreTimestampNow())).toBe(
      true,
    );
  });
});

describe("format family", () => {
  const wire = { _seconds: SECONDS, _nanoseconds: 0 };
  it("formats readable, short, iso, ordinal, and time from wire shapes", () => {
    expect(formatFirestoreTimestampToReadableDate(wire)).toContain("January");
    expect(formatFirestoreTimestampToReadableDateTime(wire)).toContain("2024");
    expect(formatFirestoreTimestampToShortDate(wire, { locale: "en-US" })).toContain(
      "24",
    );
    expect(formatFirestoreTimestampToIsoDate(new Date(2024, 0, 15))).toBe("2024-01-15");
    expect(formatFirestoreTimestampToOrdinalDate(wire)).toContain("Jan");
    expect(getTimeFromFirestoreTimestamp(new Date(2024, 0, 15, 15, 30, 45))).toBe(
      "15:30:45",
    );
  });
  it("formats relative time in both lengths", () => {
    const twoHoursAgo = Date.now() - 7_200_000;
    expect(formatFirestoreTimestampToRelative(twoHoursAgo)).toContain("2 hours ago");
    expect(formatFirestoreTimestampToRelativeShort(twoHoursAgo)).toBe("2h ago");
  });
  it("every formatter degrades to its fallback instead of throwing", () => {
    expect(formatFirestoreTimestampToReadableDate("junk")).toBe("—");
    expect(formatFirestoreTimestampToRelative(null, { fallback: "n/a" })).toBe("n/a");
    expect(formatFirestoreTimestampToIsoDate(undefined, "never")).toBe("never");
    expect(getTimeFromFirestoreTimestamp({}, "--:--")).toBe("--:--");
  });
});

describe("compare and checks", () => {
  it("sorts mixed shapes ascending, with garbage first as the 0 sentinel", () => {
    const earlier = { _seconds: SECONDS };
    const later = new Date(MILLIS + 1000);
    expect([later, earlier, "junk"].sort(compareFirestoreTimestamps)).toEqual([
      "junk",
      earlier,
      later,
    ]);
  });
  it("in-future / in-past / today never guess on garbage", () => {
    expect(isFirestoreTimestampInFuture(Date.now() + 60_000)).toBe(true);
    expect(isFirestoreTimestampInPast({ seconds: SECONDS })).toBe(true);
    expect(isFirestoreTimestampToday(new Date())).toBe(true);
    expect(isFirestoreTimestampInFuture("junk")).toBe(false);
    expect(isFirestoreTimestampInPast(null)).toBe(false);
    expect(isFirestoreTimestampToday(undefined)).toBe(false);
  });
});
