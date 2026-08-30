import { describe, expect, it } from "vitest";
import { generateUuid } from "./index.js";

describe("generators", () => {
  it("uuid v4 shape, no library", () => {
    expect(generateUuid()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it("never repeats across a small sample", () => {
    const seen = new Set(Array.from({ length: 20 }, () => generateUuid()));
    expect(seen.size).toBe(20);
  });
});
