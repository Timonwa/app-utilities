import { describe, expect, it } from "vitest";
import { addYearsToMillis, subtractYearsFromMillis } from "./index.js";

describe("subtractYearsFromMillis", () => {
  it("moves back by calendar years", () => {
    const jan15 = new Date(2024, 0, 15, 12).getTime();
    expect(new Date(subtractYearsFromMillis(jan15, 2)).getFullYear()).toBe(2022);
  });

  it("clamps Feb 29 to Feb 28 in a non-leap target year", () => {
    const leapDay = new Date(2024, 1, 29, 12).getTime();
    const result = new Date(subtractYearsFromMillis(leapDay, 1));
    expect([result.getMonth(), result.getDate()]).toEqual([1, 28]);
  });

  it("round-trips with addYearsToMillis for mid-month dates", () => {
    const jan15 = new Date(2024, 0, 15, 12).getTime();
    expect(subtractYearsFromMillis(addYearsToMillis(jan15, 5), 5)).toBe(jan15);
  });
});
