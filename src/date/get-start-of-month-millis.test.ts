import { describe, expect, it } from "vitest";
import { getEndOfMonthMillis, getStartOfMonthMillis } from "./index.js";

describe("smaller units and boundaries", () => {
  it("month boundaries in millis", () => {
    const mid = new Date(2024, 0, 15, 12).getTime();
    expect(new Date(getStartOfMonthMillis(mid)).getDate()).toBe(1);
    expect(new Date(getEndOfMonthMillis(mid)).getDate()).toBe(31);
  });

  it("zeroes the clock, not just the day", () => {
    const start = new Date(
      getStartOfMonthMillis(new Date(2024, 0, 15, 12, 30).getTime()),
    );
    expect([start.getHours(), start.getMinutes(), start.getSeconds()]).toEqual([0, 0, 0]);
  });

  it("is idempotent", () => {
    const once = getStartOfMonthMillis(new Date(2024, 0, 15, 12).getTime());
    expect(getStartOfMonthMillis(once)).toBe(once);
  });
});
