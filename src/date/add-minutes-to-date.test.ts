import { describe, expect, it } from "vitest";
import { addMinutesToDate } from "./index.js";

describe("addMinutesToDate", () => {
  it("adds minutes", () => {
    const result = addMinutesToDate(new Date(2024, 0, 15, 10, 0), 30);
    expect([result.getHours(), result.getMinutes()]).toEqual([10, 30]);
  });

  it("rolls over the hour and day boundaries", () => {
    const result = addMinutesToDate(new Date(2024, 0, 15, 23, 45), 30);
    expect([result.getDate(), result.getHours(), result.getMinutes()]).toEqual([
      16, 0, 15,
    ]);
  });

  it("subtracts with a negative amount", () => {
    expect(addMinutesToDate(new Date(2024, 0, 15, 10, 30), -45).getMinutes()).toBe(45);
  });

  it("returns a new Date without mutating the input", () => {
    const input = new Date(2024, 0, 15, 10, 0);
    expect(addMinutesToDate(input, 5)).not.toBe(input);
    expect(input.getMinutes()).toBe(0);
  });
});
