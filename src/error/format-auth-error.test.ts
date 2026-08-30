import { describe, expect, it } from "vitest";
import { authMessages, firebaseError } from "./_test-helpers.js";
import { formatAuthError } from "./index.js";

describe("formatAuthError", () => {
  it("unwraps response.data.error before formatting", () => {
    const wrapped = { response: { data: { error: firebaseError } } };
    expect(formatAuthError(wrapped, { messageForCode: (c) => authMessages[c] })).toBe(
      "Incorrect password",
    );
  });
});

describe("degradation and defaults", () => {
  it("formats an unwrapped Firebase-shaped error directly", () => {
    expect(
      formatAuthError(firebaseError, { messageForCode: (c) => authMessages[c] }),
    ).toBe("Incorrect password");
  });

  it("falls back to the raw SDK message without a code map", () => {
    expect(formatAuthError(firebaseError)).toBe("raw sdk text");
  });

  it("degrades through Error, string, then the fallback", () => {
    expect(formatAuthError(new Error("boom"))).toBe("boom");
    expect(formatAuthError("plain")).toBe("plain");
    expect(formatAuthError(undefined, { fallback: "Nope" })).toBe("Nope");
    expect(formatAuthError(undefined)).toBe("An unknown error occurred");
  });
});
