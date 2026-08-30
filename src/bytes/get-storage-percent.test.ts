import { describe, expect, it } from "vitest";
import { getStoragePercent } from "./index.js";

describe("getStoragePercent", () => {
  it("reports whole percentages", () => {
    expect(getStoragePercent(512, 1024)).toBe(50);
    expect(getStoragePercent(1024, 1024)).toBe(100);
  });

  // "No quota" is not "completely full", and it must not divide by zero either.
  it("reads a missing or invalid limit as 0%", () => {
    expect(getStoragePercent(512, 0)).toBe(0);
    expect(getStoragePercent(512, -1)).toBe(0);
    expect(getStoragePercent(Number.NaN, 1024)).toBe(0);
  });

  it("rounds to the nearest whole percent", () => {
    expect(getStoragePercent(1, 3)).toBe(33);
    expect(getStoragePercent(2, 3)).toBe(67);
  });

  it("can exceed 100 when over quota", () => {
    expect(getStoragePercent(2048, 1024)).toBe(200);
  });
});
