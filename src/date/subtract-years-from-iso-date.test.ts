import { describe, expect, it } from "vitest";
import { subtractYearsFromISODate } from "./index.js";

describe("subtractYearsFromISODate", () => {
  it("moves back by calendar years", () => {
    const input = new Date(2024, 0, 15, 12).toISOString();
    expect(new Date(subtractYearsFromISODate(input, 2)).getFullYear()).toBe(2022);
  });

  it("clamps Feb 29 to Feb 28 in a non-leap target year", () => {
    const input = new Date(2024, 1, 29, 12).toISOString();
    const result = new Date(subtractYearsFromISODate(input, 1));
    expect([result.getFullYear(), result.getMonth(), result.getDate()]).toEqual([
      2023, 1, 28,
    ]);
  });
});
