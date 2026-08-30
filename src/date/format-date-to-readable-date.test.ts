import { describe, expect, it } from "vitest";
import { formatDateToReadableDate } from "./index.js";

describe("formatDateToReadableDate", () => {
  it("formats the long local date", () => {
    expect(formatDateToReadableDate(new Date(2024, 0, 15), "en-US")).toBe(
      "January 15, 2024",
    );
  });

  it("localises through the locale argument", () => {
    expect(formatDateToReadableDate(new Date(2024, 0, 15), "fr")).toBe("15 janvier 2024");
  });

  it("merges extra Intl options over the defaults", () => {
    expect(
      formatDateToReadableDate(new Date(2024, 0, 15), "en-US", { month: "short" }),
    ).toBe("Jan 15, 2024");
  });
});
