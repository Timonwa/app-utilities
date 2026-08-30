import { describe, expect, it } from "vitest";
import { SECONDS } from "./_test-helpers.js";
import { isSerializedFirestoreTimestamp } from "./index.js";

describe("guards", () => {
  it("isSerializedFirestoreTimestamp accepts both wire spellings and rejects the rest", () => {
    expect(isSerializedFirestoreTimestamp({ seconds: SECONDS })).toBe(true);
    expect(isSerializedFirestoreTimestamp({ _seconds: SECONDS, _nanoseconds: 0 })).toBe(
      true,
    );
    expect(isSerializedFirestoreTimestamp(new Date())).toBe(false);
    expect(isSerializedFirestoreTimestamp(null)).toBe(false);
  });

  it("requires seconds to be a number", () => {
    expect(isSerializedFirestoreTimestamp({ seconds: "123" })).toBe(false);
    expect(isSerializedFirestoreTimestamp({ nanoseconds: 0 })).toBe(false);
  });

  it("rejects primitives and arrays", () => {
    expect(isSerializedFirestoreTimestamp(SECONDS)).toBe(false);
    expect(isSerializedFirestoreTimestamp([SECONDS, 0])).toBe(false);
  });
});
