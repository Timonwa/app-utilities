import { describe, expect, it } from "vitest";
import { isISODateToday, isMillisToday } from "./index.js";

describe("today checks across representations", () => {
  it("agrees for now and disagrees for yesterday", () => {
    expect(isISODateToday(new Date().toISOString())).toBe(true);
    expect(isMillisToday(Date.now())).toBe(true);
    expect(isMillisToday(Date.now() - 86_400_000 * 2)).toBe(false);
  });

  it("includes the first instant of the local day", () => {
    expect(isMillisToday(new Date().setHours(0, 0, 0, 0))).toBe(true);
  });

  it("rejects non-finite input", () => {
    expect(isMillisToday(Number.NaN)).toBe(false);
    expect(isMillisToday(Number.POSITIVE_INFINITY)).toBe(false);
  });
});
