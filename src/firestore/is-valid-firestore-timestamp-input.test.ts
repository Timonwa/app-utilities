import { describe, expect, it } from "vitest";
import { MILLIS, makeTimestampLike } from "./_test-helpers.js";
import { isValidFirestoreTimestampInput } from "./index.js";

describe("guards", () => {
  it("isValidFirestoreTimestampInput mirrors the parser", () => {
    expect(isValidFirestoreTimestampInput(MILLIS)).toBe(true);
    expect(isValidFirestoreTimestampInput("soon")).toBe(false);
  });

  it("accepts every shape the parser accepts", () => {
    expect(isValidFirestoreTimestampInput(new Date(MILLIS))).toBe(true);
    expect(isValidFirestoreTimestampInput({ _seconds: MILLIS / 1000 })).toBe(true);
    expect(isValidFirestoreTimestampInput(makeTimestampLike(MILLIS / 1000))).toBe(true);
  });

  it("rejects empty objects and non-finite millis", () => {
    expect(isValidFirestoreTimestampInput({})).toBe(false);
    expect(isValidFirestoreTimestampInput(Number.NaN)).toBe(false);
  });
});
