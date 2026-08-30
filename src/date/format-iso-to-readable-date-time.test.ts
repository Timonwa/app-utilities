import { describe, expect, it } from "vitest";
import { formatISOToReadableDateTime } from "./index.js";

describe("formatISOToReadableDateTime", () => {
  it("includes the long local date and time", () => {
    const iso = new Date(2024, 0, 15, 10, 30).toISOString();
    const formatted = formatISOToReadableDateTime(iso, "en-US");
    expect(formatted).toContain("January 15, 2024");
    expect(formatted).toContain("10:30");
  });

  it("localises through the locale argument", () => {
    const iso = new Date(2024, 0, 15, 12).toISOString();
    expect(formatISOToReadableDateTime(iso, "fr")).toContain("janvier");
  });
});
