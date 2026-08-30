import { describe, expect, it } from "vitest";
import { formatFirestoreTimestampToOrdinalDate } from "./index.js";

describe("formatFirestoreTimestampToOrdinalDate", () => {
  it("formats with the ordinal day suffix", () => {
    const local = new Date(2024, 0, 15, 12, 0);
    expect(formatFirestoreTimestampToOrdinalDate(local)).toBe("15th Jan, 2024");
  });

  it("uses st, nd, and rd where they apply", () => {
    expect(formatFirestoreTimestampToOrdinalDate(new Date(2023, 5, 22, 12))).toBe(
      "22nd Jun, 2023",
    );
    expect(formatFirestoreTimestampToOrdinalDate(new Date(2023, 5, 1, 12))).toBe(
      "1st Jun, 2023",
    );
    expect(formatFirestoreTimestampToOrdinalDate(new Date(2023, 5, 3, 12))).toBe(
      "3rd Jun, 2023",
    );
  });

  it("returns the fallback for unparseable input", () => {
    expect(formatFirestoreTimestampToOrdinalDate("junk")).toBe("—");
    expect(formatFirestoreTimestampToOrdinalDate(null, "n/a")).toBe("n/a");
  });
});
