import { describe, expect, it } from "vitest";
import { addMonthsToMillis } from "./index.js";

describe("addMonthsToMillis", () => {
  it("moves by calendar months, not fixed durations", () => {
    const jan15 = new Date(2024, 0, 15, 12).getTime();
    const result = new Date(addMonthsToMillis(jan15, 1));
    expect([result.getMonth(), result.getDate()]).toEqual([1, 15]);
  });

  it("clamps to the last day of a shorter target month", () => {
    const jan31 = new Date(2024, 0, 31, 12).getTime();
    const result = new Date(addMonthsToMillis(jan31, 1));
    expect([result.getMonth(), result.getDate()]).toEqual([1, 29]);
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    const mar15 = new Date(2024, 2, 15, 12).getTime();
    expect(new Date(addMonthsToMillis(mar15, -1)).getMonth()).toBe(1);
    expect(addMonthsToMillis(mar15, 0)).toBe(mar15);
  });

  it("crosses year boundaries", () => {
    const nov15 = new Date(2024, 10, 15, 12).getTime();
    const result = new Date(addMonthsToMillis(nov15, 3));
    expect([result.getFullYear(), result.getMonth()]).toEqual([2025, 1]);
  });
});
