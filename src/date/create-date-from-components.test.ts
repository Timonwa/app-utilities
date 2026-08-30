import { describe, expect, it } from "vitest";
import { createDateFromComponents } from "./index.js";

describe("createDateFromComponents", () => {
  it("builds a local Date from a 1-indexed month", () => {
    const date = createDateFromComponents(2024, 1, 15);
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2024, 0, 15]);
  });

  it("starts at local midnight", () => {
    const date = createDateFromComponents(2024, 6, 1);
    expect([date.getHours(), date.getMinutes()]).toEqual([0, 0]);
  });

  it("handles December without off-by-one", () => {
    expect(createDateFromComponents(2024, 12, 31).getMonth()).toBe(11);
  });

  it("rolls over out-of-range days, per Date semantics", () => {
    const date = createDateFromComponents(2023, 2, 30);
    expect([date.getMonth(), date.getDate()]).toEqual([2, 2]);
  });
});
