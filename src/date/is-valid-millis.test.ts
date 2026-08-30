import { describe, expect, it } from "vitest";
import { isValidMillis } from "./index.js";

describe("isValidMillis", () => {
  it("accepts finite non-negative numbers, including zero", () => {
    expect(isValidMillis(1_705_276_800_000)).toBe(true);
    expect(isValidMillis(0)).toBe(true);
  });

  it("rejects negative numbers", () => {
    expect(isValidMillis(-1)).toBe(false);
  });

  it("rejects NaN and infinities", () => {
    expect(isValidMillis(Number.NaN)).toBe(false);
    expect(isValidMillis(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it("rejects non-numbers", () => {
    expect(isValidMillis("1705276800000")).toBe(false);
    expect(isValidMillis(new Date())).toBe(false);
    expect(isValidMillis(null)).toBe(false);
  });
});
