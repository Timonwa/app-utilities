import { describe, expect, it } from "vitest";
import { formatDateToReadableDateTime } from "./index.js";

describe("formatDateToReadableDateTime", () => {
  it("includes the long date and the local time", () => {
    const formatted = formatDateToReadableDateTime(
      new Date(2024, 0, 15, 15, 30),
      "en-US",
    );
    expect(formatted).toContain("January 15, 2024");
    expect(formatted).toContain("3:30");
    expect(formatted).toContain("PM");
  });

  it("2-digit-pads the minutes", () => {
    expect(formatDateToReadableDateTime(new Date(2024, 0, 15, 9, 5), "en-US")).toContain(
      "9:05",
    );
  });

  it("localises through the locale argument", () => {
    expect(formatDateToReadableDateTime(new Date(2024, 0, 15, 12), "fr")).toContain(
      "janvier",
    );
  });
});
