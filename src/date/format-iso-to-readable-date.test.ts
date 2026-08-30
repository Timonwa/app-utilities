import { describe, expect, it } from "vitest";
import { formatISOToReadableDate } from "./index.js";

describe("formatISOToReadableDate", () => {
  it("formats the long local date", () => {
    expect(
      formatISOToReadableDate(new Date(2024, 0, 15, 12).toISOString(), "en-US"),
    ).toBe("January 15, 2024");
  });

  it("localises through the locale argument", () => {
    expect(formatISOToReadableDate(new Date(2024, 0, 15, 12).toISOString(), "fr")).toBe(
      "15 janvier 2024",
    );
  });
});
