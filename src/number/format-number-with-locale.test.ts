import { describe, expect, it } from "vitest";
import { formatNumberWithLocale } from "./index.js";

describe("formatNumberWithLocale", () => {
  it("defaults to en-US grouping", () => {
    expect(formatNumberWithLocale(1_234_567.89)).toBe("1,234,567.89");
  });

  it("formats per the requested locale", () => {
    expect(formatNumberWithLocale(1_234_567.89, "de-DE")).toBe("1.234.567,89");
  });

  it("passes Intl options through", () => {
    expect(formatNumberWithLocale(0.5, "en-US", { style: "percent" })).toBe("50%");
  });

  it("returns an empty string for a non-number, as documented", () => {
    expect(formatNumberWithLocale("12" as unknown as number)).toBe("");
  });
});
