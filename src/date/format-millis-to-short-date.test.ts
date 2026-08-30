import { describe, expect, it } from "vitest";
import { formatMillisToShortDate } from "./index.js";

describe("formatMillisToShortDate", () => {
  it("formats the numeric short date with a 2-digit year", () => {
    expect(formatMillisToShortDate(new Date(2024, 0, 15).getTime(), "en-US")).toBe(
      "1/15/24",
    );
  });

  it("respects day-first locales", () => {
    expect(formatMillisToShortDate(new Date(2024, 0, 15).getTime(), "en-GB")).toBe(
      "15/01/24",
    );
  });
});
