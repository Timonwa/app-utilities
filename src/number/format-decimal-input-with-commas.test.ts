import { describe, expect, it } from "vitest";
import { formatDecimalInputWithCommas, sanitizeDecimalInput } from "./index.js";

describe("formatting", () => {
  it("decimal input helpers survive partial typing", () => {
    expect(sanitizeDecimalInput("1,2a3.4.5")).toBe("123.45");
    expect(formatDecimalInputWithCommas("1234.5")).toBe("1,234.5");
    expect(formatDecimalInputWithCommas("1234.")).toBe("1,234.");
  });

  it("accepts a number, as API-fed form values arrive", () => {
    expect(formatDecimalInputWithCommas(1234567.8)).toBe("1,234,567.8");
  });

  it("keeps a bare leading decimal typable", () => {
    expect(formatDecimalInputWithCommas(".5")).toBe(".5");
  });

  it("groups plain integers and passes empty through", () => {
    expect(formatDecimalInputWithCommas("1234567")).toBe("1,234,567");
    expect(formatDecimalInputWithCommas("")).toBe("");
  });
});
