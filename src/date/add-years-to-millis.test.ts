import { describe, expect, it } from "vitest";
import { addYearsToMillis } from "./index.js";

describe("addYearsToMillis", () => {
  it("adds calendar years", () => {
    const jan15 = new Date(2024, 0, 15, 12).getTime();
    const result = new Date(addYearsToMillis(jan15, 2));
    expect([result.getFullYear(), result.getMonth(), result.getDate()]).toEqual([
      2026, 0, 15,
    ]);
  });

  it("clamps Feb 29 to Feb 28 in a non-leap target year", () => {
    const leapDay = new Date(2024, 1, 29, 12).getTime();
    const result = new Date(addYearsToMillis(leapDay, 1));
    expect([result.getMonth(), result.getDate()]).toEqual([1, 28]);
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    const jan15 = new Date(2024, 0, 15, 12).getTime();
    expect(new Date(addYearsToMillis(jan15, -1)).getFullYear()).toBe(2023);
    expect(addYearsToMillis(jan15, 0)).toBe(jan15);
  });
});
