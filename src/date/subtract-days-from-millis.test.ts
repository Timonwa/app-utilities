import { describe, expect, it } from "vitest";
import { addDaysToMillis, MILLIS_PER_DAY, subtractDaysFromMillis } from "./index.js";

describe("subtractDaysFromMillis", () => {
  it("subtracts fixed 24-hour blocks", () => {
    expect(subtractDaysFromMillis(1_705_276_800_000, 5)).toBe(
      1_705_276_800_000 - 5 * MILLIS_PER_DAY,
    );
  });

  it("round-trips with addDaysToMillis", () => {
    expect(subtractDaysFromMillis(addDaysToMillis(1_705_276_800_000, 9), 9)).toBe(
      1_705_276_800_000,
    );
  });
});
