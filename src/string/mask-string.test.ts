import { describe, expect, it } from "vitest";
import { maskString } from "./index.js";

describe("maskString", () => {
  it("leaves the trailing characters visible", () => {
    expect(maskString("4242424242424242")).toBe("••••••••••••4242");
    expect(maskString("123", 4)).toBe("123");
  });

  it("respects a custom visible count", () => {
    expect(maskString("secret-token", 2)).toBe("••••••••••en");
  });

  it("returns the value as-is when it is exactly the visible length", () => {
    expect(maskString("1234", 4)).toBe("1234");
  });

  it("keeps the masked output the same length as the input", () => {
    expect(maskString("4242424242424242").length).toBe(16);
  });

  it("hides everything when zero characters are visible", () => {
    expect(maskString("secret-token", 0)).toBe("••••••••••••");
  });
});
