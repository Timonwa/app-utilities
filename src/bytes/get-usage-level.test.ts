import { describe, expect, it } from "vitest";
import { getUsageLevel } from "./index.js";

describe("getUsageLevel", () => {
  it("bands a percentage without naming a colour", () => {
    expect(getUsageLevel(10)).toBe("low");
    expect(getUsageLevel(60)).toBe("medium");
    expect(getUsageLevel(75)).toBe("high");
    expect(getUsageLevel(95)).toBe("critical");
  });

  it("takes its own thresholds, since 'high' differs per quota", () => {
    expect(getUsageLevel(30, { medium: 10, high: 20, critical: 25 })).toBe("critical");
  });

  it("treats each threshold as inclusive", () => {
    expect(getUsageLevel(50)).toBe("medium");
    expect(getUsageLevel(70)).toBe("high");
    expect(getUsageLevel(90)).toBe("critical");
    expect(getUsageLevel(49.9)).toBe("low");
  });
});
