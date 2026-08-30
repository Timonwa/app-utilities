import { describe, expect, it } from "vitest";
import { authMessages, firebaseError } from "./_test-helpers.js";
import { formatError } from "./index.js";

describe("formatError", () => {
  it("prefers the server's message on HTTP errors", () => {
    expect(
      formatError({ status: 400, response: { data: { message: "Slug taken" } } }),
    ).toBe("Slug taken");
  });

  it("resolves structured codes through the caller's map, message otherwise", () => {
    expect(formatError(firebaseError, { messageForCode: (c) => authMessages[c] })).toBe(
      "Incorrect password",
    );
    expect(formatError(firebaseError)).toBe("raw sdk text");
  });

  it("degrades through Error, string, fallback", () => {
    expect(formatError(new Error("boom"))).toBe("boom");
    expect(formatError("plain")).toBe("plain");
    expect(formatError(undefined, { fallback: "Nope" })).toBe("Nope");
    expect(formatError(undefined)).toBe("An unknown error occurred");
  });
});
