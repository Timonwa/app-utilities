import { describe, expect, it } from "vitest";
import {
  generateNumericCode,
  generateRandomString,
  generateReadableCode,
  generateTransactionRef,
  generateUuid,
  getRandomNumberBetween,
  READABLE_CODE_REGEX,
  sanitizeReadableCodeInput,
} from "./index.js";

describe("generators", () => {
  it("uuid v4 shape, no library", () => {
    expect(generateUuid()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it("random string and numeric code respect length and alphabet", () => {
    expect(generateRandomString(12)).toMatch(/^[A-Za-z0-9]{12}$/);
    expect(generateNumericCode(6)).toMatch(/^\d{6}$/);
  });

  it("readable codes match their own regex, and the sanitizer reconstructs them", () => {
    const code = generateReadableCode();
    expect(code).toMatch(READABLE_CODE_REGEX);
    expect(sanitizeReadableCodeInput(code.toLowerCase().replace("-", ""))).toBe(code);
    // ambiguous characters never appear
    expect(code).not.toMatch(/[ILO01]/);
  });

  it("transaction ref combines the uid tail with a random suffix", () => {
    expect(generateTransactionRef("user12345678")).toMatch(/^12345678-[A-Za-z0-9]{8}$/);
  });

  it("random number stays in its inclusive range", () => {
    for (let i = 0; i < 50; i++) {
      const n = getRandomNumberBetween(1, 6);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(6);
      expect(Number.isInteger(n)).toBe(true);
    }
  });
});
