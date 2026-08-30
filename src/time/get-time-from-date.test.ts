import { describe, expect, it } from "vitest";
import { getTimeFromDate } from "./index.js";

describe("getTimeFromDate", () => {
  it("returns the local HH:MM:SS portion", () => {
    expect(getTimeFromDate(new Date(2024, 0, 15, 15, 30, 45))).toBe("15:30:45");
  });

  it("zero-pads every segment", () => {
    expect(getTimeFromDate(new Date(2024, 0, 15, 5, 3, 7))).toBe("05:03:07");
  });

  it("returns midnight as 00:00:00", () => {
    expect(getTimeFromDate(new Date(2024, 0, 15))).toBe("00:00:00");
  });
});
