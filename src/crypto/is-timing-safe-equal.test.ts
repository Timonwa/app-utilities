import { describe, expect, it } from "vitest";
import { isTimingSafeEqual } from "./index.js";

describe("isTimingSafeEqual", () => {
  it("accepts an exact match", () => {
    expect(isTimingSafeEqual("secret-token", "secret-token")).toBe(true);
  });
  it("rejects a near miss and a case difference", () => {
    expect(isTimingSafeEqual("secret-token", "secret-tokeN")).toBe(false);
  });
  it("rejects different lengths, including prefixes and empty strings", () => {
    expect(isTimingSafeEqual("secret", "secret-token")).toBe(false);
    expect(isTimingSafeEqual("", "x")).toBe(false);
  });
  it("accepts two empty strings", () => {
    expect(isTimingSafeEqual("", "")).toBe(true);
  });
  it("handles multi-byte UTF-8 comparison", () => {
    expect(isTimingSafeEqual("₦100", "₦100")).toBe(true);
    expect(isTimingSafeEqual("₦100", "₦101")).toBe(false);
  });
});
