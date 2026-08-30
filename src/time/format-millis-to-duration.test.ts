import { describe, expect, it } from "vitest";
import { formatMillisToDuration } from "./index.js";

describe("formatMillisToDuration", () => {
  it("names every non-zero unit, comma-separated", () => {
    expect(formatMillisToDuration(90_061_000)).toBe("1 day, 1 hour, 1 minute, 1 second");
  });

  it("skips zero units in the middle", () => {
    expect(formatMillisToDuration(86_400_000 + 5000)).toBe("1 day, 5 seconds");
  });

  it("pluralises correctly", () => {
    expect(formatMillisToDuration(2 * 86_400_000 + 2 * 3_600_000)).toBe(
      "2 days, 2 hours",
    );
  });

  it('returns "0 seconds" for zero and sub-second durations', () => {
    expect(formatMillisToDuration(0)).toBe("0 seconds");
    expect(formatMillisToDuration(999)).toBe("0 seconds");
  });

  it("floors partial seconds", () => {
    expect(formatMillisToDuration(1999)).toBe("1 second");
  });
});
