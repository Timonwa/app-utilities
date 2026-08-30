import { describe, expect, it } from "vitest";
import { getEndOfMonthMillis } from "./index.js";

describe("getEndOfMonthMillis", () => {
  it("returns the last millisecond of the local month", () => {
    const millis = new Date(2024, 0, 15, 12).getTime();
    expect(getEndOfMonthMillis(millis)).toBe(
      new Date(2024, 0, 31, 23, 59, 59, 999).getTime(),
    );
  });

  it("handles the leap-year February", () => {
    const millis = new Date(2024, 1, 1).getTime();
    expect(new Date(getEndOfMonthMillis(millis)).getDate()).toBe(29);
  });
});
