import { describe, expect, it } from "vitest";
import { isError } from "./index.js";

describe("shape guards", () => {
  it("isError", () => {
    expect(isError(new Error("x"))).toBe(true);
    expect(isError("x")).toBe(false);
  });
});

describe("edge shapes", () => {
  it("accepts Error subclasses", () => {
    expect(isError(new TypeError("t"))).toBe(true);
    expect(isError(new RangeError("r"))).toBe(true);
  });

  it("rejects error-like plain objects and nullish values", () => {
    expect(isError({ name: "Error", message: "fake" })).toBe(false);
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
  });
});
