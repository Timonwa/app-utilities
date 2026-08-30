import { describe, expect, it } from "vitest";
import { isStringPalindrome } from "./index.js";

describe("isStringPalindrome", () => {
  it("ignores case and punctuation", () => {
    expect(isStringPalindrome("A man, a plan, a canal: Panama")).toBe(true);
    expect(isStringPalindrome("hello")).toBe(false);
  });

  it("accepts even-length and numeric palindromes", () => {
    expect(isStringPalindrome("abba")).toBe(true);
    expect(isStringPalindrome("12321")).toBe(true);
  });

  it("treats single characters and empty input as palindromes", () => {
    expect(isStringPalindrome("x")).toBe(true);
    expect(isStringPalindrome("")).toBe(true);
  });
});
