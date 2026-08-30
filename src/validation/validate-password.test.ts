import { describe, expect, it } from "vitest";
import { validatePassword } from "./index.js";

describe("form validators", () => {
  it("password collects every failed rule", () => {
    const weak = validatePassword("abc");
    expect(weak.valid).toBe(false);
    expect(weak.messages.length).toBeGreaterThanOrEqual(2);
    expect(weak.message).toBe(weak.messages[0]);
    expect(validatePassword("Password123").valid).toBe(true);
  });

  it("every rule is toggleable", () => {
    expect(
      validatePassword("password", { requireUppercase: false, requireNumbers: false })
        .valid,
    ).toBe(true);
    expect(validatePassword("Password123", { requireSpecialChars: true }).valid).toBe(
      false,
    );
    expect(validatePassword("Password123!", { requireSpecialChars: true }).valid).toBe(
      true,
    );
  });

  it("respects a custom minimum length exactly", () => {
    expect(validatePassword("Ab1", { minLength: 3 }).valid).toBe(true);
    expect(validatePassword("Ab1", { minLength: 4 }).messages).toContain(
      "Password must be at least 4 characters",
    );
  });

  it("a valid password reports no messages", () => {
    const strong = validatePassword("Password123");
    expect(strong.messages).toEqual([]);
    expect(strong.message).toBeUndefined();
  });
});
