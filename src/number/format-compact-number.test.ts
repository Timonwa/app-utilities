import { describe, expect, it } from "vitest";
import { formatCompactNumber } from "./index.js";

describe("formatting", () => {
  it("compact via Intl", () => {
    expect(formatCompactNumber(1_500_000)).toBe("1.5M");
    expect(formatCompactNumber(82_000)).toBe("82K");
    expect(formatCompactNumber(Number.NaN)).toBe("");
  });

  it("localizes instead of hardcoding English suffixes", () => {
    expect(formatCompactNumber(1_500_000, "ja-JP")).toBe("150万");
  });

  it("keeps small and negative values sensible", () => {
    expect(formatCompactNumber(950)).toBe("950");
    expect(formatCompactNumber(-1500)).toBe("-1.5K");
  });
});
