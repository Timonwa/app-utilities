import { describe, expect, it } from "vitest";
import { addHoursToDate, subtractHoursFromDate } from "./index.js";

describe("subtractHoursFromDate", () => {
  it("subtracts hours", () => {
    expect(subtractHoursFromDate(new Date(2024, 0, 15, 10), 2).getHours()).toBe(8);
  });

  it("rolls back over the day boundary", () => {
    const result = subtractHoursFromDate(new Date(2024, 0, 15, 1), 3);
    expect([result.getDate(), result.getHours()]).toEqual([14, 22]);
  });

  it("round-trips with addHoursToDate", () => {
    const input = new Date(2024, 0, 15, 10);
    expect(subtractHoursFromDate(addHoursToDate(input, 6), 6).getTime()).toBe(
      input.getTime(),
    );
  });
});
