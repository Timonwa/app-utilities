import { describe, expect, it } from "vitest";
import { formatMillisToReadableDateTime } from "./index.js";

describe("formatMillisToReadableDateTime", () => {
  it("includes the long local date and time", () => {
    const millis = new Date(2024, 0, 15, 15, 30).getTime();
    const formatted = formatMillisToReadableDateTime(millis, "en-US");
    expect(formatted).toContain("January 15, 2024");
    expect(formatted).toContain("3:30");
  });

  it("localises through the locale argument", () => {
    const millis = new Date(2024, 0, 15, 12).getTime();
    expect(formatMillisToReadableDateTime(millis, "fr")).toContain("janvier");
  });
});
