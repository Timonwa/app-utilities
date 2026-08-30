import { describe, expect, it } from "vitest";
import { getEndOfDay } from "./index.js";

describe("getEndOfDay", () => {
  it("returns 23:59:59.999 local on the same day", () => {
    const result = getEndOfDay(new Date(2024, 0, 15, 10, 30));
    expect([result.getDate(), result.getHours(), result.getMinutes()]).toEqual([
      15, 23, 59,
    ]);
    expect([result.getSeconds(), result.getMilliseconds()]).toEqual([59, 999]);
  });

  it("does not mutate the input", () => {
    const input = new Date(2024, 0, 15, 10, 30);
    getEndOfDay(input);
    expect(input.getHours()).toBe(10);
  });
});
