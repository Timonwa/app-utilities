import { describe, expect, it } from "vitest";
import { addMinutesToDate, subtractMinutesFromDate } from "./index.js";

describe("subtractMinutesFromDate", () => {
  it("subtracts minutes", () => {
    expect(subtractMinutesFromDate(new Date(2024, 0, 15, 10, 30), 30).getMinutes()).toBe(
      0,
    );
  });

  it("rolls back over the hour boundary", () => {
    const result = subtractMinutesFromDate(new Date(2024, 0, 15, 10, 10), 20);
    expect([result.getHours(), result.getMinutes()]).toEqual([9, 50]);
  });

  it("round-trips with addMinutesToDate", () => {
    const input = new Date(2024, 0, 15, 10, 0);
    expect(subtractMinutesFromDate(addMinutesToDate(input, 45), 45).getTime()).toBe(
      input.getTime(),
    );
  });
});
