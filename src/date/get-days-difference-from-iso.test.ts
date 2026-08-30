import { describe, expect, it } from "vitest";
import { getDaysDifferenceFromISO } from "./index.js";

describe("getDaysDifferenceFromISO", () => {
  it("counts whole calendar days between two ISO dates", () => {
    expect(getDaysDifferenceFromISO("2024-01-15", "2024-01-20")).toBe(5);
  });

  it("is always positive regardless of argument order", () => {
    expect(getDaysDifferenceFromISO("2024-01-20", "2024-01-15")).toBe(5);
  });

  it("returns zero for the same day", () => {
    expect(getDaysDifferenceFromISO("2024-01-15", "2024-01-15")).toBe(0);
  });

  it("counts across the leap day", () => {
    expect(getDaysDifferenceFromISO("2024-02-28", "2024-03-01")).toBe(2);
  });
});
