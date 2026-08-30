import { describe, expect, it } from "vitest";
import { formatMillisToIsoDate } from "./index.js";

describe("formatMillisToIsoDate", () => {
  it("returns the LOCAL calendar date as YYYY-MM-DD", () => {
    expect(formatMillisToIsoDate(new Date(2024, 0, 15).getTime())).toBe("2024-01-15");
  });

  it("stays on the local day right up to midnight", () => {
    expect(formatMillisToIsoDate(new Date(2024, 0, 15, 23, 59, 59).getTime())).toBe(
      "2024-01-15",
    );
  });

  it("zero-pads single-digit months and days", () => {
    expect(formatMillisToIsoDate(new Date(2024, 8, 5).getTime())).toBe("2024-09-05");
  });
});
