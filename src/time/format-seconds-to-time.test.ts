import { describe, expect, it } from "vitest";
import {
  formatMillisToDuration,
  formatMillisToShortDuration,
  formatMillisToTime,
  formatSecondsToTime,
} from "./index.js";

describe("duration formatting", () => {
  it("covers the three shapes", () => {
    expect(formatSecondsToTime(3661)).toBe("01:01:01");
    expect(formatSecondsToTime(90, false)).toBe("01:30");
    expect(formatMillisToTime(3_661_000)).toBe("01:01:01");
    expect(formatMillisToDuration(90_061_000)).toBe("1 day, 1 hour, 1 minute, 1 second");
    expect(formatMillisToShortDuration(9_000_000)).toBe("2h 30m");
    expect(formatMillisToDuration(0)).toBe("0 seconds");
  });

  it("keeps the hours segment when there are hours, even with includeHours off", () => {
    expect(formatSecondsToTime(3661, false)).toBe("01:01:01");
    expect(formatSecondsToTime(0, false)).toBe("00:00");
  });

  it("uses singular unit names for exactly one", () => {
    expect(formatMillisToDuration(1000)).toBe("1 second");
    expect(formatMillisToDuration(120_000)).toBe("2 minutes");
  });

  it("drops empty segments from the short shape", () => {
    expect(formatMillisToShortDuration(3_600_000)).toBe("1h");
    expect(formatMillisToShortDuration(2_700_000)).toBe("45m");
    expect(formatMillisToShortDuration(0)).toBe("0m");
  });
});
