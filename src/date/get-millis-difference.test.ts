import { describe, expect, it } from "vitest";
import { getMillisDifference, MILLIS_PER_DAY, MILLIS_PER_HOUR } from "./index.js";

describe("getMillisDifference", () => {
  it("defaults to raw milliseconds", () => {
    expect(getMillisDifference(1000, 4500)).toBe(3500);
  });

  it("is absolute regardless of argument order", () => {
    expect(getMillisDifference(4500, 1000)).toBe(3500);
  });

  it("converts to each named unit, flooring partials", () => {
    expect(getMillisDifference(0, 1999, "seconds")).toBe(1);
    expect(getMillisDifference(0, 119_000, "minutes")).toBe(1);
    expect(getMillisDifference(0, 2.5 * MILLIS_PER_HOUR, "hours")).toBe(2);
    expect(getMillisDifference(0, 5 * MILLIS_PER_DAY, "days")).toBe(5);
  });

  it("returns zero for identical timestamps", () => {
    expect(getMillisDifference(42, 42, "days")).toBe(0);
  });
});
