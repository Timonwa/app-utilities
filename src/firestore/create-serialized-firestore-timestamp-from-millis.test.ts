import { describe, expect, it } from "vitest";
import { MILLIS, SECONDS } from "./_test-helpers.js";
import {
  createSerializedFirestoreTimestampFromDate,
  createSerializedFirestoreTimestampFromMillis,
  parseFirestoreTimestampToDate,
} from "./index.js";

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

  it("gives zero nanoseconds on whole seconds", () => {
    expect(createSerializedFirestoreTimestampFromMillis(MILLIS)).toEqual({
      seconds: SECONDS,
      nanoseconds: 0,
    });
  });
});
