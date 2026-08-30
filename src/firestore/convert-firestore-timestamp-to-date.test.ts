import { describe, expect, it } from "vitest";
import { MILLIS, makeTimestampLike, SECONDS } from "./_test-helpers.js";
import {
  convertFirestoreTimestampToDate,
  convertFirestoreTimestampToISOString,
  convertFirestoreTimestampToMillis,
} from "./index.js";

describe("exact converters", () => {
  const serialized = { seconds: SECONDS, nanoseconds: 0 };
  it("converts to Date, millis, and ISO string", () => {
    expect(convertFirestoreTimestampToDate(serialized).getTime()).toBe(MILLIS);
    expect(convertFirestoreTimestampToMillis(serialized)).toBe(MILLIS);
    expect(convertFirestoreTimestampToISOString(serialized)).toBe(
      "2024-01-15T00:00:00.000Z",
    );
  });

  it("accepts live timestamps and the underscore wire spelling", () => {
    expect(convertFirestoreTimestampToDate(makeTimestampLike(SECONDS)).getTime()).toBe(
      MILLIS,
    );
    expect(
      convertFirestoreTimestampToMillis({ _seconds: SECONDS, _nanoseconds: 0 }),
    ).toBe(MILLIS);
  });

  it("carries nanoseconds into the millisecond part", () => {
    expect(
      convertFirestoreTimestampToMillis({ seconds: SECONDS, nanoseconds: 500_000_000 }),
    ).toBe(MILLIS + 500);
  });
});
