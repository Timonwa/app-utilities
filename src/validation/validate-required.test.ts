import { describe, expect, it } from "vitest";
import { validateRequired } from "./index.js";

describe("form validators", () => {
  it("required across shapes", () => {
    expect(validateRequired("x", "Name").valid).toBe(true);
    expect(validateRequired("  ", "Name").message).toBe("Name is required");
    expect(validateRequired([], "Tags").valid).toBe(false);
    expect(validateRequired(0, "Count").valid).toBe(true);
  });

  it("rejects null and undefined by name", () => {
    expect(validateRequired(null, "Venue").message).toBe("Venue is required");
    expect(validateRequired(undefined, "Venue").valid).toBe(false);
  });

  it("accepts false and non-empty arrays", () => {
    expect(validateRequired(false, "Consent").valid).toBe(true);
    expect(validateRequired(["a"], "Tags").valid).toBe(true);
  });
});
