import { describe, expect, it } from "vitest";
import {
  addMinutesToMillis,
  MILLIS_PER_MINUTE,
  subtractMinutesFromMillis,
} from "./index.js";

describe("subtractMinutesFromMillis", () => {
  it("subtracts fixed minutes", () => {
    expect(subtractMinutesFromMillis(1_705_276_800_000, 15)).toBe(
      1_705_276_800_000 - 15 * MILLIS_PER_MINUTE,
    );
  });

  it("round-trips with addMinutesToMillis", () => {
    expect(subtractMinutesFromMillis(addMinutesToMillis(0, 90), 90)).toBe(0);
  });
});
