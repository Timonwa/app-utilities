import { describe, expect, it } from "vitest";
import { getStartOfDayMillis } from "./index.js";

describe("getStartOfDayMillis", () => {
  it("returns local midnight of that day", () => {
    const millis = new Date(2024, 0, 15, 10, 30).getTime();
    expect(getStartOfDayMillis(millis)).toBe(new Date(2024, 0, 15).getTime());
  });

  it("is idempotent at midnight itself", () => {
    const midnight = new Date(2024, 0, 15).getTime();
    expect(getStartOfDayMillis(midnight)).toBe(midnight);
  });
});
