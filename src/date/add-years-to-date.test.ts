import { describe, expect, it } from "vitest";
import { addYearsToDate, formatDateToIsoDate } from "./index.js";

describe("calendar arithmetic clamps instead of overflowing", () => {
  it("Feb 29 + 1 year is Feb 28", () => {
    expect(formatDateToIsoDate(addYearsToDate(new Date(2024, 1, 29), 1))).toBe(
      "2025-02-28",
    );
  });

  it("passes ordinary dates through unclamped", () => {
    expect(formatDateToIsoDate(addYearsToDate(new Date(2024, 0, 15), 1))).toBe(
      "2025-01-15",
    );
  });

  it("clamps going backwards from a leap day", () => {
    expect(formatDateToIsoDate(addYearsToDate(new Date(2024, 1, 29), -1))).toBe(
      "2023-02-28",
    );
  });
});
