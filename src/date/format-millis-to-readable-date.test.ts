import { describe, expect, it } from "vitest";
import { formatMillisToReadableDate } from "./index.js";

describe("formatMillisToReadableDate", () => {
  it("formats the long local date", () => {
    expect(formatMillisToReadableDate(new Date(2024, 0, 15, 12).getTime(), "en-US")).toBe(
      "January 15, 2024",
    );
  });

  it("localises through the locale argument", () => {
    expect(formatMillisToReadableDate(new Date(2024, 0, 15, 12).getTime(), "fr")).toBe(
      "15 janvier 2024",
    );
  });
});
