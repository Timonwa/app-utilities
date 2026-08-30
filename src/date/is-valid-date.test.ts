import { describe, expect, it } from "vitest";
import { isValidDate } from "./index.js";

describe("isValidDate", () => {
  it("accepts real Date instances", () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date(0))).toBe(true);
  });

  it("rejects Invalid Date instances", () => {
    expect(isValidDate(new Date("invalid"))).toBe(false);
    expect(isValidDate(new Date(Number.NaN))).toBe(false);
  });

  it("rejects non-Date values", () => {
    expect(isValidDate("2024-01-15")).toBe(false);
    expect(isValidDate(1_705_276_800_000)).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
  });
});
