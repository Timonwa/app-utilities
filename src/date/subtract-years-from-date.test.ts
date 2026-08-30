import { describe, expect, it } from "vitest";
import { subtractYearsFromDate } from "./index.js";

describe("subtractYearsFromDate", () => {
  it("moves back by calendar years", () => {
    expect(subtractYearsFromDate(new Date(2024, 0, 15, 12), 2).getFullYear()).toBe(2022);
  });

  it("clamps Feb 29 to Feb 28 in a non-leap target year", () => {
    const result = subtractYearsFromDate(new Date(2024, 1, 29, 12), 1);
    expect([result.getFullYear(), result.getMonth(), result.getDate()]).toEqual([
      2023, 1, 28,
    ]);
  });
});
