import { describe, expect, it } from "vitest";
import { countWordsInString } from "./index.js";

describe("countWordsInString", () => {
  it("counts words", () => {
    expect(countWordsInString("hello world")).toBe(2);
  });

  // "".split(/\s+/) is [""], length 1 — so whitespace-only used to count as a word.
  it("returns 0 for empty and whitespace-only input", () => {
    expect(countWordsInString("")).toBe(0);
    expect(countWordsInString("   ")).toBe(0);
  });

  it("treats any whitespace run as one separator", () => {
    expect(countWordsInString("one\t two\nthree")).toBe(3);
  });

  it("counts a single word", () => {
    expect(countWordsInString("hello")).toBe(1);
  });
});
