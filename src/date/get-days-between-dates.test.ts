import { describe, expect, it } from "vitest";
import { getDaysBetweenDates } from "./index.js";

describe("getDaysBetweenDates counts calendar days", () => {
  it("day boundaries crossed, not elapsed 24h blocks ceil'd", () => {
    // 26 elapsed hours but exactly 1 boundary crossed — the old ceil said 2.
    expect(
      getDaysBetweenDates(new Date(2024, 0, 1, 23, 0), new Date(2024, 0, 2, 1, 0)),
    ).toBe(1);
    expect(getDaysBetweenDates(new Date(2024, 0, 1), new Date(2024, 0, 15))).toBe(14);
  });

  it("is symmetric in its arguments", () => {
    const a = new Date(2024, 0, 1);
    const b = new Date(2024, 0, 15);
    expect(getDaysBetweenDates(b, a)).toBe(getDaysBetweenDates(a, b));
  });

  it("returns 0 within the same calendar day", () => {
    expect(getDaysBetweenDates(new Date(2024, 0, 1, 1), new Date(2024, 0, 1, 23))).toBe(
      0,
    );
  });
});
