import { describe, expect, it } from "vitest";
import { generateReadableCode, READABLE_CODE_REGEX } from "./index.js";

describe("READABLE_CODE_REGEX", () => {
  it("matches the default output of generateReadableCode", () => {
    for (let run = 0; run < 20; run++) {
      expect(generateReadableCode()).toMatch(READABLE_CODE_REGEX);
    }
  });

  it("matches a well-formed code", () => {
    expect(READABLE_CODE_REGEX.test("K3F7-9TXM")).toBe(true);
  });

  it("rejects ambiguous characters I, L, O, 0, 1", () => {
    expect(READABLE_CODE_REGEX.test("I3F7-9TXM")).toBe(false);
    expect(READABLE_CODE_REGEX.test("K3F7-9TX0")).toBe(false);
    expect(READABLE_CODE_REGEX.test("K1F7-9TXM")).toBe(false);
    expect(READABLE_CODE_REGEX.test("KLF7-9TXM")).toBe(false);
    expect(READABLE_CODE_REGEX.test("KOF7-9TXM")).toBe(false);
  });

  it("rejects wrong shapes", () => {
    expect(READABLE_CODE_REGEX.test("K3F79TXM")).toBe(false);
    expect(READABLE_CODE_REGEX.test("K3F7-9TX")).toBe(false);
    expect(READABLE_CODE_REGEX.test("k3f7-9txm")).toBe(false);
    expect(READABLE_CODE_REGEX.test("")).toBe(false);
  });
});
