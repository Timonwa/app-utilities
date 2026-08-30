import { describe, expect, it } from "vitest";
import { subtractMonthsFromDate } from "./index.js";

describe("subtractMonthsFromDate", () => {
  it("moves back by calendar months", () => {
    const result = subtractMonthsFromDate(new Date(2024, 2, 15, 12), 2);
    expect([result.getMonth(), result.getDate()]).toEqual([0, 15]);
  });

  it("clamps to the last day of a shorter target month", () => {
    const result = subtractMonthsFromDate(new Date(2024, 2, 31, 12), 1);
    expect([result.getMonth(), result.getDate()]).toEqual([1, 29]);
  });

  it("crosses year boundaries", () => {
    const result = subtractMonthsFromDate(new Date(2024, 0, 15, 12), 2);
    expect([result.getFullYear(), result.getMonth()]).toEqual([2023, 10]);
  });
});
