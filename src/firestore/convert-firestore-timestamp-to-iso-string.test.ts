import { describe, expect, it } from "vitest";
import { MILLIS, makeTimestampLike, SECONDS } from "./_test-helpers.js";
import { convertFirestoreTimestampToISOString } from "./index.js";

describe("convertFirestoreTimestampToISOString", () => {
  it("converts a serialized wire shape exactly", () => {
    expect(
      convertFirestoreTimestampToISOString({ seconds: SECONDS, nanoseconds: 0 }),
    ).toBe("2024-01-15T00:00:00.000Z");
  });

  it("converts a live SDK-shaped timestamp", () => {
    expect(convertFirestoreTimestampToISOString(makeTimestampLike(SECONDS))).toBe(
      "2024-01-15T00:00:00.000Z",
    );
  });

  it("carries nanoseconds through as milliseconds", () => {
    expect(
      convertFirestoreTimestampToISOString({
        seconds: SECONDS,
        nanoseconds: 500_000_000,
      }),
    ).toBe("2024-01-15T00:00:00.500Z");
  });

  it("handles the epoch", () => {
    expect(convertFirestoreTimestampToISOString({ seconds: 0, nanoseconds: 0 })).toBe(
      "1970-01-01T00:00:00.000Z",
    );
    expect(MILLIS).toBe(SECONDS * 1000);
  });
});
