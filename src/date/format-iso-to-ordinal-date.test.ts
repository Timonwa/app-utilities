import { describe, expect, it } from "vitest";
import { formatISOToOrdinalDate } from "./index.js";

describe("formatISOToOrdinalDate", () => {
  it("formats with the ordinal day suffix", () => {
    expect(formatISOToOrdinalDate(new Date(2023, 5, 22, 12).toISOString())).toBe(
      "22nd Jun, 2023",
    );
  });

  it("uses st, rd, and the 11th-13th th exception", () => {
    expect(formatISOToOrdinalDate(new Date(2023, 5, 1, 12).toISOString())).toBe(
      "1st Jun, 2023",
    );
    expect(formatISOToOrdinalDate(new Date(2023, 5, 3, 12).toISOString())).toBe(
      "3rd Jun, 2023",
    );
    expect(formatISOToOrdinalDate(new Date(2023, 5, 11, 12).toISOString())).toBe(
      "11th Jun, 2023",
    );
    expect(formatISOToOrdinalDate(new Date(2023, 5, 13, 12).toISOString())).toBe(
      "13th Jun, 2023",
    );
  });

  it("uses th for the teens and regular days", () => {
    expect(formatISOToOrdinalDate(new Date(2024, 0, 15, 12).toISOString())).toBe(
      "15th Jan, 2024",
    );
  });
});
