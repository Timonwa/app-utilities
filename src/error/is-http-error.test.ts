import { describe, expect, it } from "vitest";
import { isHttpError } from "./index.js";

describe("shape guards", () => {
  it("recognises HTTP-shaped errors from any client", () => {
    expect(isHttpError({ isAxiosError: true })).toBe(true);
    expect(isHttpError({ status: 404 })).toBe(true);
    expect(isHttpError({ response: { status: 500 } })).toBe(true);
    expect(isHttpError(new Error("plain"))).toBe(false);
    expect(isHttpError(null)).toBe(false);
  });
});
