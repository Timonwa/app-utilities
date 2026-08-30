import { describe, expect, it } from "vitest";
import { addDaysToDate, subtractDaysFromDate } from "./index.js";

describe("subtractDaysFromDate", () => {
  it("subtracts calendar days", () => {
    expect(subtractDaysFromDate(new Date(2024, 0, 15, 12), 5).getDate()).toBe(10);
  });

  it("rolls back over month boundaries", () => {
    const result = subtractDaysFromDate(new Date(2024, 2, 1, 12), 1);
    expect([result.getMonth(), result.getDate()]).toEqual([1, 29]);
  });

  it("round-trips with addDaysToDate", () => {
    const input = new Date(2024, 0, 15, 12);
    expect(subtractDaysFromDate(addDaysToDate(input, 7), 7).getTime()).toBe(
      input.getTime(),
    );
  });

  it("does not mutate the input", () => {
    const input = new Date(2024, 0, 15, 12);
    subtractDaysFromDate(input, 3);
    expect(input.getDate()).toBe(15);
  });
});
