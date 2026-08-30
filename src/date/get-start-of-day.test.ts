import { describe, expect, it } from "vitest";
import { getStartOfDay } from "./index.js";

describe("getStartOfDay", () => {
  it("returns local midnight of the same day", () => {
    const result = getStartOfDay(new Date(2024, 0, 15, 10, 30, 45, 500));
    expect([result.getDate(), result.getHours(), result.getMinutes()]).toEqual([
      15, 0, 0,
    ]);
    expect([result.getSeconds(), result.getMilliseconds()]).toEqual([0, 0]);
  });

  it("does not mutate the input", () => {
    const input = new Date(2024, 0, 15, 10, 30);
    getStartOfDay(input);
    expect(input.getHours()).toBe(10);
  });
});
