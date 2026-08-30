import { describe, expect, it } from "vitest";
import { hasValidationErrors } from "./index.js";

describe("hasValidationErrors", () => {
  it("returns true when any result is invalid", () => {
    expect(
      hasValidationErrors([{ valid: true }, { valid: false, message: "nope" }]),
    ).toBe(true);
  });

  it("returns false when every result is valid", () => {
    expect(hasValidationErrors([{ valid: true }, { valid: true }])).toBe(false);
  });

  it("returns false for an empty list", () => {
    expect(hasValidationErrors([])).toBe(false);
  });
});
