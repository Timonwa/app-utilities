import { describe, expect, it } from "vitest";
import { formatBytes } from "./index.js";

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
