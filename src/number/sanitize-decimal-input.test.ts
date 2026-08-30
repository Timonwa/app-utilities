import { describe, expect, it } from "vitest";
import { sanitizeDecimalInput } from "./index.js";

describe("sanitizeDecimalInput", () => {
  it("strips everything but digits and one decimal point", () => {
    expect(sanitizeDecimalInput("$1,2.3.4")).toBe("12.34");
    expect(sanitizeDecimalInput("abc123def")).toBe("123");
  });

  it("keeps only the first decimal point", () => {
    expect(sanitizeDecimalInput("1.2.3")).toBe("1.23");
  });

  it("passes clean input through unchanged", () => {
    expect(sanitizeDecimalInput("12.34")).toBe("12.34");
    expect(sanitizeDecimalInput("0")).toBe("0");
  });

  it("returns an empty string when nothing numeric survives", () => {
    expect(sanitizeDecimalInput("")).toBe("");
    expect(sanitizeDecimalInput("abc-!")).toBe("");
  });

  it("keeps a leading or lone decimal point", () => {
    expect(sanitizeDecimalInput(".5")).toBe(".5");
    expect(sanitizeDecimalInput(".")).toBe(".");
  });
});
