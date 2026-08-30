import { describe, expect, it } from "vitest";
import { normalizeStringWhitespace } from "./index.js";

describe("normalizeStringWhitespace", () => {
  it("collapses runs of spaces and trims the ends", () => {
    expect(normalizeStringWhitespace("hello    world ")).toBe("hello world");
    expect(normalizeStringWhitespace("  a  b  c  ")).toBe("a b c");
  });

  it("collapses tabs and newlines too", () => {
    expect(normalizeStringWhitespace("a\t\nb")).toBe("a b");
  });

  it("returns an empty string unchanged", () => {
    expect(normalizeStringWhitespace("")).toBe("");
  });

  it("reduces all-whitespace input to an empty string", () => {
    expect(normalizeStringWhitespace("   \t ")).toBe("");
  });

  it("leaves already-clean strings alone", () => {
    expect(normalizeStringWhitespace("hello world")).toBe("hello world");
  });
});
