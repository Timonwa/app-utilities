import { describe, expect, it } from "vitest";
import { getStartOfMonth } from "./index.js";

describe("getStartOfMonth", () => {
  it("returns the first of the month at local midnight", () => {
    const result = getStartOfMonth(new Date(2024, 0, 15, 10, 30));
    expect([result.getMonth(), result.getDate(), result.getHours()]).toEqual([0, 1, 0]);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("does not mutate the input", () => {
    const input = new Date(2024, 0, 15, 10, 30);
    getStartOfMonth(input);
    expect(input.getDate()).toBe(15);
  });
});
