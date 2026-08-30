import { describe, expect, it } from "vitest";
import { formatCurrencyMapFromMinorUnits } from "./index.js";

describe("formatCurrencyMapFromMinorUnits", () => {
  it("formats a money map sorted descending, zeros dropped", () => {
    const lines = formatCurrencyMapFromMinorUnits(
      { USD: 4500, NGN: 12_000_000, EUR: 0 },
      { locale: "en-US" },
    );
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("120,000");
    expect(lines[1]).toContain("45.00");
  });

  it("keeps zero lines when hideZero is off", () => {
    const lines = formatCurrencyMapFromMinorUnits(
      { USD: 4500, EUR: 0 },
      { locale: "en-US", hideZero: false },
    );
    expect(lines).toHaveLength(2);
    expect(lines[1]).toContain("0.00");
  });

  it("returns an empty list for an empty map", () => {
    expect(formatCurrencyMapFromMinorUnits({})).toEqual([]);
  });
});
