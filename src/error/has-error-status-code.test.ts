import { describe, expect, it } from "vitest";
import { hasErrorStatusCode } from "./index.js";

describe("hasErrorStatusCode", () => {
  it("matches an error carrying that status code", () => {
    expect(hasErrorStatusCode({ response: { status: 404 } }, 404)).toBe(true);
    expect(hasErrorStatusCode({ status: 429 }, 429)).toBe(true);
  });

  it("returns false for a different code", () => {
    expect(hasErrorStatusCode({ status: 404 }, 500)).toBe(false);
  });

  it("returns false when the error has no status at all", () => {
    expect(hasErrorStatusCode(new Error("plain"), 404)).toBe(false);
    expect(hasErrorStatusCode(null, 404)).toBe(false);
    expect(hasErrorStatusCode("boom", 404)).toBe(false);
  });
});
