import { describe, expect, it } from "vitest";
import { addYearsToISODate } from "./index.js";

describe("addYearsToISODate", () => {
  it("adds calendar years", () => {
    const input = new Date(2024, 0, 15, 12).toISOString();
    const result = new Date(addYearsToISODate(input, 1));
    expect([result.getFullYear(), result.getMonth(), result.getDate()]).toEqual([
      2025, 0, 15,
    ]);
  });

  it("clamps Feb 29 to Feb 28 in a non-leap target year", () => {
    const leapDay = new Date(2024, 1, 29, 12).toISOString();
    const result = new Date(addYearsToISODate(leapDay, 1));
    expect([result.getFullYear(), result.getMonth(), result.getDate()]).toEqual([
      2025, 1, 28,
    ]);
  });

  it("subtracts with a negative amount", () => {
    const input = new Date(2024, 0, 15, 12).toISOString();
    expect(new Date(addYearsToISODate(input, -4)).getFullYear()).toBe(2020);
  });
});
