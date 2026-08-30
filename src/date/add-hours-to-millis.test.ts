import { describe, expect, it } from "vitest";
import { addHoursToMillis, MILLIS_PER_HOUR } from "./index.js";

describe("addHoursToMillis", () => {
  it("adds fixed hours", () => {
    expect(addHoursToMillis(1_705_276_800_000, 3)).toBe(
      1_705_276_800_000 + 3 * MILLIS_PER_HOUR,
    );
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    expect(addHoursToMillis(1_705_276_800_000, -2)).toBe(
      1_705_276_800_000 - 2 * MILLIS_PER_HOUR,
    );
    expect(addHoursToMillis(1_705_276_800_000, 0)).toBe(1_705_276_800_000);
  });

  it("supports fractional hours", () => {
    expect(addHoursToMillis(0, 0.5)).toBe(MILLIS_PER_HOUR / 2);
  });
});
