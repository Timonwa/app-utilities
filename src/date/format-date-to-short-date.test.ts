import { describe, expect, it } from "vitest";
import { formatDateToShortDate } from "./index.js";

describe("formatDateToShortDate", () => {
  it("formats the numeric short date with a 2-digit year", () => {
    expect(formatDateToShortDate(new Date(2024, 0, 15), "en-US")).toBe("1/15/24");
  });

  it("respects day-first locales", () => {
    expect(formatDateToShortDate(new Date(2024, 0, 15), "en-GB")).toBe("15/01/24");
  });
});
