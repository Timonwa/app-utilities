import { describe, expect, it } from "vitest";
import { getErrorRetryAfterSeconds } from "./index.js";

describe("retry-after", () => {
  it("reads the header on a 429, whole seconds", () => {
    expect(
      getErrorRetryAfterSeconds({
        response: { status: 429, headers: { "retry-after": "29.2" } },
      }),
    ).toBe(30);
  });

  it("falls back to the structured field, and gates on 429", () => {
    expect(
      getErrorRetryAfterSeconds({
        response: { status: 429, data: { error: { details: { retryAfter: 15 } } } },
      }),
    ).toBe(15);
    expect(getErrorRetryAfterSeconds({ response: { status: 500 } })).toBeUndefined();
  });
});

describe("degradation", () => {
  it("returns undefined on a 429 with neither header nor structured field", () => {
    expect(getErrorRetryAfterSeconds({ response: { status: 429 } })).toBeUndefined();
  });

  it("ignores a non-numeric or non-positive header", () => {
    expect(
      getErrorRetryAfterSeconds({
        response: { status: 429, headers: { "retry-after": "soon" } },
      }),
    ).toBeUndefined();
    expect(
      getErrorRetryAfterSeconds({
        response: { status: 429, headers: { "retry-after": "0" } },
      }),
    ).toBeUndefined();
  });

  it("returns undefined for non-HTTP errors", () => {
    expect(getErrorRetryAfterSeconds(new Error("boom"))).toBeUndefined();
    expect(getErrorRetryAfterSeconds(undefined)).toBeUndefined();
  });
});
