import { describe, expect, it } from "vitest";
import { formatMillisToShortDuration } from "./index.js";

describe("formatMillisToShortDuration", () => {
  it("shows hours and minutes together", () => {
    expect(formatMillisToShortDuration(9_000_000)).toBe("2h 30m");
  });

  it("drops the zero side", () => {
    expect(formatMillisToShortDuration(7_200_000)).toBe("2h");
    expect(formatMillisToShortDuration(300_000)).toBe("5m");
  });

  it('returns "0m" for zero and sub-minute durations', () => {
    expect(formatMillisToShortDuration(0)).toBe("0m");
    expect(formatMillisToShortDuration(59_000)).toBe("0m");
  });

  it("rolls days into hours rather than truncating", () => {
    expect(formatMillisToShortDuration(26 * 3_600_000)).toBe("26h");
  });
});
