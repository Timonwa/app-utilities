import { describe, expect, it } from "vitest";
import { formatISOToShortDate } from "./index.js";

describe("formatISOToShortDate", () => {
  it("formats the numeric short date with a 2-digit year", () => {
    expect(formatISOToShortDate(new Date(2024, 0, 15, 12).toISOString(), "en-US")).toBe(
      "1/15/24",
    );
  });

  it("respects day-first locales", () => {
    expect(formatISOToShortDate(new Date(2024, 0, 15, 12).toISOString(), "en-GB")).toBe(
      "15/01/24",
    );
  });
});
