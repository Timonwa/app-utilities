import { describe, expect, it } from "vitest";
import { addHoursToDate, addMinutesToDate } from "./index.js";

describe("smaller units and boundaries", () => {
  it("adds hours and minutes to a Date", () => {
    const base = new Date(2024, 0, 15, 10, 0);
    expect(addHoursToDate(base, 3).getHours()).toBe(13);
    expect(addMinutesToDate(base, 45).getMinutes()).toBe(45);
    expect(base.getHours()).toBe(10); // untouched
  });

  it("rolls the date when crossing midnight", () => {
    const late = addHoursToDate(new Date(2024, 0, 15, 23, 0), 3);
    expect(late.getDate()).toBe(16);
    expect(late.getHours()).toBe(2);
  });

  it("subtracts with a negative amount", () => {
    expect(addHoursToDate(new Date(2024, 0, 15, 10, 0), -12).getDate()).toBe(14);
  });
});
