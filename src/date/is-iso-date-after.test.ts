import { describe, expect, it } from "vitest";
import { isISODateAfter, isISODateBefore } from "./index.js";

describe("isISODateAfter", () => {
  it("returns true only when the first is strictly later", () => {
    expect(isISODateAfter("2024-01-16", "2024-01-15")).toBe(true);
    expect(isISODateAfter("2024-01-15", "2024-01-16")).toBe(false);
  });

  it("returns false for equal instants", () => {
    expect(isISODateAfter("2024-01-15T10:00:00.000Z", "2024-01-15T10:00:00.000Z")).toBe(
      false,
    );
  });

  it("mirrors isISODateBefore", () => {
    expect(isISODateBefore("2024-01-15", "2024-01-16")).toBe(true);
    expect(isISODateAfter("2024-01-16", "2024-01-15")).toBe(true);
  });
});
