import { describe, expect, it } from "vitest";
import { convertISOStringToDate } from "./index.js";

describe("convertISOStringToDate", () => {
  it("parses a full ISO string to the exact instant", () => {
    expect(convertISOStringToDate("2024-01-15T10:30:00.000Z").getTime()).toBe(
      Date.UTC(2024, 0, 15, 10, 30),
    );
  });

  it("parses a date-only string as LOCAL midnight, per parseISO", () => {
    const date = convertISOStringToDate("2024-01-15");
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2024, 0, 15]);
    expect(date.getHours()).toBe(0);
  });

  it("returns an Invalid Date for garbage rather than throwing", () => {
    expect(convertISOStringToDate("not a date").getTime()).toBeNaN();
    expect(convertISOStringToDate("").getTime()).toBeNaN();
  });
});
