import { describe, expect, it } from "vitest";
import {
  convertBytesToMegabytes,
  convertGigabytesToBytes,
  convertGigabytesToMegabytes,
  convertKilobytesToBytes,
  convertMegabytesToBytes,
  convertMegabytesToGigabytes,
  formatBytes,
  getStoragePercent,
  getUsageLevel,
  parseSizeToBytes,
} from "./index.js";

describe("formatBytes", () => {
  it("picks the largest unit the value fits into", () => {
    expect(formatBytes(512)).toBe("512.00 B");
    expect(formatBytes(2048)).toBe("2.00 KB");
    expect(formatBytes(1_572_864)).toBe("1.50 MB");
    expect(formatBytes(1_073_741_824)).toBe("1.00 GB");
  });

  it("honours the decimals argument", () => {
    expect(formatBytes(1_572_864, 0)).toBe("2 MB");
  });

  // log(0) is -Infinity, so an unguarded implementation returns "NaN undefined".
  it("returns a zero size rather than NaN for 0 and negatives", () => {
    expect(formatBytes(0)).toBe("0.00 B");
    expect(formatBytes(-1)).toBe("0.00 B");
    expect(formatBytes(Number.NaN)).toBe("0.00 B");
  });

  it("caps at the largest known unit instead of running off the end", () => {
    expect(formatBytes(1024 ** 6)).toBe("1024.00 PB");
  });
});

describe("convertBytesToMegabytes", () => {
  it("uses the binary 1024 step, not 1000", () => {
    expect(convertBytesToMegabytes(1_048_576)).toBe(1);
  });
});

describe("round trips", () => {
  it("converts back and forth exactly, without rounding in between", () => {
    expect(convertKilobytesToBytes(2)).toBe(2048);
    expect(convertMegabytesToBytes(1)).toBe(1_048_576);
    expect(convertGigabytesToBytes(1)).toBe(1_073_741_824);
    expect(convertMegabytesToGigabytes(1536)).toBe(1.5);
    expect(convertGigabytesToMegabytes(1.5)).toBe(1536);
  });

  // The originals did parseFloat(n.toFixed(2)) inside conversions, so a chain lost
  // precision silently. Rounding belongs at the display edge, not in the maths.
  it("survives a chain without drift", () => {
    const bytes = 1_234_567_890;
    expect(convertGigabytesToBytes(convertBytesToMegabytes(bytes) / 1024)).toBeCloseTo(
      bytes,
      5,
    );
  });
});

describe("parseSizeToBytes", () => {
  it("parses a written size, case- and space-insensitively", () => {
    expect(parseSizeToBytes("1.5 MB")).toBe(1_572_864);
    expect(parseSizeToBytes("500kb")).toBe(512_000);
    expect(parseSizeToBytes("  2 GB ")).toBe(2_147_483_648);
  });

  // null rather than 0, so "empty file" and "not a size" stay distinguishable.
  it("returns null for anything that is not a size", () => {
    expect(parseSizeToBytes("about 2 gigs")).toBeNull();
    expect(parseSizeToBytes("")).toBeNull();
    expect(parseSizeToBytes("MB")).toBeNull();
  });

  it("round-trips with formatBytes", () => {
    expect(formatBytes(parseSizeToBytes("1.50 MB") as number)).toBe("1.50 MB");
  });
});

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
});

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
});
