import { describe, expect, it } from "vitest";
import { formatTimeTo12Hour } from "./index.js";

describe("12h / 24h conversion", () => {
  it("formatTimeTo12Hour degrades to empty for junk", () => {
    expect(formatTimeTo12Hour("14:30")).toBe("2:30 PM");
    expect(formatTimeTo12Hour("nope")).toBe("");
  });

  it("handles midnight and noon", () => {
    expect(formatTimeTo12Hour("00:05")).toBe("12:05 AM");
    expect(formatTimeTo12Hour("12:00")).toBe("12:00 PM");
  });

  it("returns empty when a segment is missing", () => {
    expect(formatTimeTo12Hour("")).toBe("");
    expect(formatTimeTo12Hour("14")).toBe("");
  });

  it("returns empty when the segments are not numbers", () => {
    expect(formatTimeTo12Hour("aa:bb")).toBe("");
  });
});
