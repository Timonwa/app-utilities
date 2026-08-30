import { describe, expect, it } from "vitest";
import { addMinutesToTime } from "./index.js";

describe("clock arithmetic", () => {
  it("adds minutes, wrapping midnight", () => {
    expect(addMinutesToTime("14:30", 45)).toBe("15:15");
    expect(addMinutesToTime("23:30", 45)).toBe("00:15");
  });

  it("subtracts with a negative amount", () => {
    expect(addMinutesToTime("14:30", -45)).toBe("13:45");
  });

  it("zero-pads both segments", () => {
    expect(addMinutesToTime("09:00", 5)).toBe("09:05");
  });

  it("wraps below midnight when subtracting", () => {
    expect(addMinutesToTime("00:15", -30)).toBe("23:45");
  });
});
