import { describe, expect, it } from "vitest";
import { subtractMonthsFromISODate } from "./index.js";

describe("subtractMonthsFromISODate", () => {
  it("moves back by calendar months", () => {
    const input = new Date(2024, 2, 15, 12).toISOString();
    const result = new Date(subtractMonthsFromISODate(input, 2));
    expect([result.getMonth(), result.getDate()]).toEqual([0, 15]);
  });

  it("clamps to the last day of a shorter target month", () => {
    const input = new Date(2024, 2, 31, 12).toISOString();
    const result = new Date(subtractMonthsFromISODate(input, 1));
    expect([result.getMonth(), result.getDate()]).toEqual([1, 29]);
  });

  it("adds with a negative amount", () => {
    const input = new Date(2024, 0, 15, 12).toISOString();
    expect(new Date(subtractMonthsFromISODate(input, -1)).getMonth()).toBe(1);
  });
});
