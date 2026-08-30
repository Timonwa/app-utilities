import { describe, expect, it } from "vitest";
import { addMinutesToMillis, MILLIS_PER_MINUTE } from "./index.js";

describe("addMinutesToMillis", () => {
  it("adds fixed minutes", () => {
    expect(addMinutesToMillis(1_705_276_800_000, 30)).toBe(
      1_705_276_800_000 + 30 * MILLIS_PER_MINUTE,
    );
  });

  it("subtracts with a negative amount and is a no-op at zero", () => {
    expect(addMinutesToMillis(1_705_276_800_000, -15)).toBe(
      1_705_276_800_000 - 15 * MILLIS_PER_MINUTE,
    );
    expect(addMinutesToMillis(1_705_276_800_000, 0)).toBe(1_705_276_800_000);
  });
});
