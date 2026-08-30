import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./index.js";

describe("getErrorMessage", () => {
  it("drills into message, error, errors — joining arrays", () => {
    expect(
      getErrorMessage({ status: 400, response: { data: { errors: ["a", "b"] } } }),
    ).toBe("a, b");
    expect(getErrorMessage({ message: "objecty" })).toBe("objecty");
  });
});

describe("non-HTTP degradation", () => {
  it("prefers data.message, then data.error, then data.errors", () => {
    expect(
      getErrorMessage({ status: 400, response: { data: { message: "first" } } }),
    ).toBe("first");
    expect(
      getErrorMessage({ status: 400, response: { data: { error: "second" } } }),
    ).toBe("second");
  });

  it("reads Error instances, strings, and message-bearing objects", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
    expect(getErrorMessage("plain")).toBe("plain");
    expect(getErrorMessage({ message: 42 })).toBe("42");
  });

  it("returns the generic message for anything else", () => {
    expect(getErrorMessage(undefined)).toBe("An unexpected error occurred");
    expect(getErrorMessage(null)).toBe("An unexpected error occurred");
    expect(getErrorMessage({ status: 500, response: {} })).toBe(
      "An unexpected error occurred",
    );
  });
});
