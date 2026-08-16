import { describe, expect, it } from "vitest";
import {
  formatAuthError,
  formatError,
  getErrorMessage,
  getErrorRetryAfterSeconds,
  getErrorStatusCode,
  hasErrorStatusCode,
  isError,
  isHttpError,
  isMaintenanceError,
} from "./index.js";

const firebaseError = {
  name: "FirebaseError",
  code: "auth/wrong-password",
  message: "raw sdk text",
};
const authMessages: Record<string, string> = {
  "auth/wrong-password": "Incorrect password",
};

describe("shape guards", () => {
  it("recognises HTTP-shaped errors from any client", () => {
    expect(isHttpError({ isAxiosError: true })).toBe(true);
    expect(isHttpError({ status: 404 })).toBe(true);
    expect(isHttpError({ response: { status: 500 } })).toBe(true);
    expect(isHttpError(new Error("plain"))).toBe(false);
    expect(isHttpError(null)).toBe(false);
  });

  it("status helpers agree", () => {
    const err = { response: { status: 404 } };
    expect(getErrorStatusCode(err)).toBe(404);
    expect(hasErrorStatusCode(err, 404)).toBe(true);
    expect(hasErrorStatusCode(err, 500)).toBe(false);
    expect(getErrorStatusCode("nope")).toBeUndefined();
  });

  it("isError", () => {
    expect(isError(new Error("x"))).toBe(true);
    expect(isError("x")).toBe(false);
  });
});

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

describe("formatAuthError", () => {
  it("unwraps response.data.error before formatting", () => {
    const wrapped = { response: { data: { error: firebaseError } } };
    expect(formatAuthError(wrapped, { messageForCode: (c) => authMessages[c] })).toBe(
      "Incorrect password",
    );
  });
});

describe("getErrorMessage", () => {
  it("drills into message, error, errors — joining arrays", () => {
    expect(
      getErrorMessage({ status: 400, response: { data: { errors: ["a", "b"] } } }),
    ).toBe("a, b");
    expect(getErrorMessage({ message: "objecty" })).toBe("objecty");
  });
});

describe("isMaintenanceError", () => {
  it("matches the structured code and the message substring", () => {
    expect(isMaintenanceError({ code: "PLATFORM_MAINTENANCE" })).toBe(true);
    expect(isMaintenanceError(new Error("Down for scheduled maintenance"))).toBe(true);
    expect(isMaintenanceError(new Error("boom"))).toBe(false);
  });

  it("takes the app's own contract as options", () => {
    expect(isMaintenanceError({ code: "MAINT" }, { code: "MAINT" })).toBe(true);
  });
});
