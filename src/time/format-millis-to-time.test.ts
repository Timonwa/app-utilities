import { describe, expect, it } from "vitest";
import { formatMillisToTime } from "./index.js";

describe("formatMillisToTime", () => {
  it("formats as zero-padded HH:MM:SS", () => {
    expect(formatMillisToTime(3_661_000)).toBe("01:01:01");
    expect(formatMillisToTime(0)).toBe("00:00:00");
  });

  it("floors partial seconds", () => {
    expect(formatMillisToTime(1999)).toBe("00:00:01");
  });

  it("lets hours grow past two digits rather than wrapping", () => {
    expect(formatMillisToTime(100 * 3_600_000)).toBe("100:00:00");
  });
});
