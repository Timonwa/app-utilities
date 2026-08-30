import { describe, expect, it } from "vitest";
import {
  generateReadableCode,
  READABLE_CODE_REGEX,
  sanitizeReadableCodeInput,
} from "./index.js";

describe("generators", () => {
  it("readable codes match their own regex, and the sanitizer reconstructs them", () => {
    const code = generateReadableCode();
    expect(code).toMatch(READABLE_CODE_REGEX);
    expect(sanitizeReadableCodeInput(code.toLowerCase().replace("-", ""))).toBe(code);
    // ambiguous characters never appear
    expect(code).not.toMatch(/[ILO01]/);
  });

  it("honours length, group size, and separator", () => {
    expect(generateReadableCode(9, 3, ".")).toMatch(
      /^[A-HJKMNP-Z2-9]{3}\.[A-HJKMNP-Z2-9]{3}\.[A-HJKMNP-Z2-9]{3}$/,
    );
  });

  it("skips grouping when asked", () => {
    expect(generateReadableCode(8, 0)).toMatch(/^[A-HJKMNP-Z2-9]{8}$/);
    expect(generateReadableCode(4, 8)).toMatch(/^[A-HJKMNP-Z2-9]{4}$/);
  });

  it("the sanitizer strips ambiguous characters and caps at 8", () => {
    expect(sanitizeReadableCodeInput("k3f10olw9txmzzz")).toBe("K3FW-9TXM");
    expect(sanitizeReadableCodeInput("k3f")).toBe("K3F");
  });
});
