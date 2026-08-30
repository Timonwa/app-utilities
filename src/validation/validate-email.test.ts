import { describe, expect, it } from "vitest";
import { validateEmail } from "./index.js";

describe("one result shape everywhere", () => {
  it("valid results carry no message; invalid ones do", () => {
    expect(validateEmail("a@b.co")).toEqual({ valid: true });
    expect(validateEmail("nope").valid).toBe(false);
    expect(validateEmail("nope").message).toBe("Invalid email format");
  });

  it("treats empty and whitespace-only input as missing, not malformed", () => {
    expect(validateEmail("").message).toBe("Email is required");
    expect(validateEmail("   ").message).toBe("Email is required");
  });

  it("rejects addresses missing a TLD, a local part, or with extra @s", () => {
    expect(validateEmail("user@domain").valid).toBe(false);
    expect(validateEmail("@example.com").valid).toBe(false);
    expect(validateEmail("a@b@c.co").valid).toBe(false);
    expect(validateEmail("has space@example.com").valid).toBe(false);
  });

  it("stays loose enough for real-world addresses", () => {
    expect(validateEmail("first.last+tag@sub.example.co.uk").valid).toBe(true);
    expect(validateEmail("o'brien@example.com").valid).toBe(true);
  });
});
