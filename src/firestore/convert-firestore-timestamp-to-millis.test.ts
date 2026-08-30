import { describe, expect, it } from "vitest";
import { MILLIS, makeTimestampLike, SECONDS } from "./_test-helpers.js";
import { convertFirestoreTimestampToMillis } from "./index.js";

describe("convertFirestoreTimestampToMillis", () => {
  it("converts a serialized wire shape exactly", () => {
    expect(convertFirestoreTimestampToMillis({ seconds: SECONDS, nanoseconds: 0 })).toBe(
      MILLIS,
    );
  });

  it("converts a live SDK-shaped timestamp", () => {
    expect(convertFirestoreTimestampToMillis(makeTimestampLike(SECONDS))).toBe(MILLIS);
  });

  it("floors nanoseconds into whole milliseconds", () => {
    expect(
      convertFirestoreTimestampToMillis({ seconds: SECONDS, nanoseconds: 1_500_000 }),
    ).toBe(MILLIS + 1);
  });

  it("handles the epoch as zero", () => {
    expect(convertFirestoreTimestampToMillis({ seconds: 0, nanoseconds: 0 })).toBe(0);
  });
});
