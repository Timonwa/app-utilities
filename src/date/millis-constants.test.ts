import { describe, expect, it } from "vitest";
import {
  MILLIS_PER_DAY,
  MILLIS_PER_HOUR,
  MILLIS_PER_MINUTE,
  MILLIS_PER_SECOND,
  MILLIS_PER_WEEK,
} from "./index.js";

describe("millis constants", () => {
  it("holds the exact unit values", () => {
    expect(MILLIS_PER_SECOND).toBe(1000);
    expect(MILLIS_PER_MINUTE).toBe(60_000);
    expect(MILLIS_PER_HOUR).toBe(3_600_000);
    expect(MILLIS_PER_DAY).toBe(86_400_000);
    expect(MILLIS_PER_WEEK).toBe(604_800_000);
  });

  it("each unit is the expected multiple of the previous", () => {
    expect(MILLIS_PER_MINUTE).toBe(60 * MILLIS_PER_SECOND);
    expect(MILLIS_PER_HOUR).toBe(60 * MILLIS_PER_MINUTE);
    expect(MILLIS_PER_DAY).toBe(24 * MILLIS_PER_HOUR);
    expect(MILLIS_PER_WEEK).toBe(7 * MILLIS_PER_DAY);
  });
});
