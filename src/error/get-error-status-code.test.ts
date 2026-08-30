import { describe, expect, it } from "vitest";
import { getErrorStatusCode, hasErrorStatusCode } from "./index.js";

describe("shape guards", () => {
  it("status helpers agree", () => {
    const err = { response: { status: 404 } };
    expect(getErrorStatusCode(err)).toBe(404);
    expect(hasErrorStatusCode(err, 404)).toBe(true);
    expect(hasErrorStatusCode(err, 500)).toBe(false);
    expect(getErrorStatusCode("nope")).toBeUndefined();
  });
});

describe("precedence and degradation", () => {
  it("prefers response.status over a top-level status", () => {
    expect(getErrorStatusCode({ status: 400, response: { status: 404 } })).toBe(404);
  });

  it("falls back to the top-level status", () => {
    expect(getErrorStatusCode({ status: 400 })).toBe(400);
  });

  it("returns undefined for non-HTTP shapes", () => {
    expect(getErrorStatusCode(new Error("plain"))).toBeUndefined();
    expect(getErrorStatusCode(null)).toBeUndefined();
  });
});
