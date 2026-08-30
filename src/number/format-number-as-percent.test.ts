import { describe, expect, it } from "vitest";
import { formatNumberAsPercent } from "./index.js";

describe("formatNumberAsPercent", () => {
  it("multiplies a 0-1 value by 100 and appends a percent sign", () => {
    expect(formatNumberAsPercent(0.123)).toBe("12.3%");
    expect(formatNumberAsPercent(1)).toBe("100.0%");
  });

  it("defaults to one decimal place", () => {
    expect(formatNumberAsPercent(0.5)).toBe("50.0%");
  });

  it("honours a custom decimals argument", () => {
    expect(formatNumberAsPercent(0.12345, 2)).toBe("12.35%");
    expect(formatNumberAsPercent(0.5, 0)).toBe("50%");
  });

  it("handles zero and values above one", () => {
    expect(formatNumberAsPercent(0)).toBe("0.0%");
    expect(formatNumberAsPercent(1.5)).toBe("150.0%");
  });

  it("returns an empty string for a non-number, as documented", () => {
    expect(formatNumberAsPercent("0.5" as unknown as number)).toBe("");
  });
});
