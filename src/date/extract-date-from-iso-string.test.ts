import { describe, expect, it } from "vitest";
import { extractDateFromISOString } from "./index.js";

describe("extractDateFromISOString", () => {
  it("returns the YYYY-MM-DD portion verbatim", () => {
    expect(extractDateFromISOString("2024-01-15T10:30:00.000Z")).toBe("2024-01-15");
  });

  it("returns a date-only string whole", () => {
    expect(extractDateFromISOString("2024-01-15")).toBe("2024-01-15");
  });

  it("returns an empty string for empty input", () => {
    expect(extractDateFromISOString("")).toBe("");
  });
});
