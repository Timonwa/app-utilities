import { describe, expect, it } from "vitest";
import { getEndOfMonth } from "./index.js";

describe("getEndOfMonth", () => {
  it("returns the last day of the month at 23:59:59.999 local", () => {
    const result = getEndOfMonth(new Date(2024, 0, 15));
    expect([result.getMonth(), result.getDate(), result.getHours()]).toEqual([0, 31, 23]);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("knows February's leap-year length", () => {
    expect(getEndOfMonth(new Date(2024, 1, 10)).getDate()).toBe(29);
    expect(getEndOfMonth(new Date(2023, 1, 10)).getDate()).toBe(28);
  });

  it("does not mutate the input", () => {
    const input = new Date(2024, 0, 15);
    getEndOfMonth(input);
    expect(input.getDate()).toBe(15);
  });
});
