import { describe, expect, it } from "vitest";
import { MILLIS, SECONDS } from "./_test-helpers.js";
import {
  convertFirestoreTimestampToMillis,
  createSerializedFirestoreTimestampFromDate,
} from "./index.js";

describe("createSerializedFirestoreTimestampFromDate", () => {
  it("produces the { seconds, nanoseconds } wire shape", () => {
    expect(createSerializedFirestoreTimestampFromDate(new Date(MILLIS))).toEqual({
      seconds: SECONDS,
      nanoseconds: 0,
    });
  });

  it("keeps sub-second precision in nanoseconds", () => {
    expect(createSerializedFirestoreTimestampFromDate(new Date(MILLIS + 250))).toEqual({
      seconds: SECONDS,
      nanoseconds: 250_000_000,
    });
  });

  it("handles the epoch", () => {
    expect(createSerializedFirestoreTimestampFromDate(new Date(0))).toEqual({
      seconds: 0,
      nanoseconds: 0,
    });
  });

  it("round-trips back to the same instant", () => {
    const date = new Date(MILLIS + 123);
    expect(
      convertFirestoreTimestampToMillis(createSerializedFirestoreTimestampFromDate(date)),
    ).toBe(date.getTime());
  });
});
