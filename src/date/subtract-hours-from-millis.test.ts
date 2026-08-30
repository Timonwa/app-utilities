import { describe, expect, it } from "vitest";
import { addHoursToMillis, MILLIS_PER_HOUR, subtractHoursFromMillis } from "./index.js";

describe("subtractHoursFromMillis", () => {
  it("subtracts fixed hours", () => {
    expect(subtractHoursFromMillis(1_705_276_800_000, 2)).toBe(
      1_705_276_800_000 - 2 * MILLIS_PER_HOUR,
    );
  });

  it("round-trips with addHoursToMillis", () => {
    expect(subtractHoursFromMillis(addHoursToMillis(0, 5), 5)).toBe(0);
  });
});
