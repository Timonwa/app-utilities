import { describe, expect, it } from "vitest";
import { addDaysToMillis, MILLIS_PER_DAY } from "./index.js";

describe("addDaysToMillis", () => {
  it("adds fixed 24-hour blocks", () => {
    expect(addDaysToMillis(1_705_276_800_000, 5)).toBe(
      1_705_276_800_000 + 5 * MILLIS_PER_DAY,
    );
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    expect(addDaysToMillis(1_705_276_800_000, -1)).toBe(
      1_705_276_800_000 - MILLIS_PER_DAY,
    );
    expect(addDaysToMillis(1_705_276_800_000, 0)).toBe(1_705_276_800_000);
  });

  it("works from the epoch", () => {
    expect(addDaysToMillis(0, 1)).toBe(MILLIS_PER_DAY);
  });
});
