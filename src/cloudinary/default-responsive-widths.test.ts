import { describe, expect, it } from "vitest";
import { SAMPLE_UPLOAD_URL } from "./_test-helpers.js";
import { buildCloudinarySrcset, DEFAULT_RESPONSIVE_WIDTHS } from "./index.js";

describe("DEFAULT_RESPONSIVE_WIDTHS", () => {
  it("covers phone through large desktop", () => {
    expect(DEFAULT_RESPONSIVE_WIDTHS).toEqual([480, 768, 1024, 1280, 1600]);
  });

  it("is strictly ascending", () => {
    const sorted = [...DEFAULT_RESPONSIVE_WIDTHS].sort((a, b) => a - b);
    expect([...DEFAULT_RESPONSIVE_WIDTHS]).toEqual(sorted);
    expect(new Set(DEFAULT_RESPONSIVE_WIDTHS).size).toBe(
      DEFAULT_RESPONSIVE_WIDTHS.length,
    );
  });

  it("is what buildCloudinarySrcset uses when no widths are passed", () => {
    const srcset = buildCloudinarySrcset(SAMPLE_UPLOAD_URL);
    for (const width of DEFAULT_RESPONSIVE_WIDTHS) {
      expect(srcset).toContain(`${width}w`);
    }
  });
});
