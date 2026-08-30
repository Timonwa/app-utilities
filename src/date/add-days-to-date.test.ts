import { describe, expect, it } from "vitest";
import { addDaysToDate } from "./index.js";

describe("addDaysToDate", () => {
  it("adds calendar days", () => {
    const result = addDaysToDate(new Date(2024, 0, 10, 12, 0), 5);
    expect([result.getFullYear(), result.getMonth(), result.getDate()]).toEqual([
      2024, 0, 15,
    ]);
  });

  it("rolls over month and year boundaries", () => {
    const result = addDaysToDate(new Date(2024, 11, 30, 12, 0), 3);
    expect([result.getFullYear(), result.getMonth(), result.getDate()]).toEqual([
      2025, 0, 2,
    ]);
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    expect(addDaysToDate(new Date(2024, 0, 15, 12), -5).getDate()).toBe(10);
    expect(addDaysToDate(new Date(2024, 0, 15, 12), 0).getDate()).toBe(15);
  });

  it("returns a new Date without mutating the input", () => {
    const input = new Date(2024, 0, 15, 12);
    const result = addDaysToDate(input, 1);
    expect(result).not.toBe(input);
    expect(input.getDate()).toBe(15);
  });
});
