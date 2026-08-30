import { describe, expect, it } from "vitest";
import { compareDates } from "./index.js";

describe("compareDates", () => {
  it("sorts ascending", () => {
    const a = new Date(2024, 0, 1);
    const b = new Date(2024, 5, 1);
    expect([b, a].sort(compareDates)).toEqual([a, b]);
  });

  it("returns the -1/0/1 contract directly", () => {
    const a = new Date(2024, 0, 1);
    const b = new Date(2024, 5, 1);
    expect(compareDates(a, b)).toBe(-1);
    expect(compareDates(b, a)).toBe(1);
  });

  it("treats equal instants as equal", () => {
    expect(compareDates(new Date(1000), new Date(1000))).toBe(0);
  });
});
