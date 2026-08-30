import { describe, expect, it } from "vitest";
import { compareISODates } from "./index.js";

describe("compareISODates", () => {
  it("orders earlier before later", () => {
    expect(compareISODates("2024-01-15", "2024-01-16")).toBe(-1);
    expect(compareISODates("2024-01-16", "2024-01-15")).toBe(1);
  });

  it("returns 0 for the same instant", () => {
    expect(compareISODates("2024-01-15T10:00:00.000Z", "2024-01-15T10:00:00.000Z")).toBe(
      0,
    );
  });

  it("compares full timestamps, not just dates", () => {
    expect(compareISODates("2024-01-15T10:00:00.000Z", "2024-01-15T11:00:00.000Z")).toBe(
      -1,
    );
  });

  it("works as an Array.prototype.sort comparator", () => {
    const dates = ["2024-03-01", "2024-01-01", "2024-02-01"];
    expect([...dates].sort(compareISODates)).toEqual([
      "2024-01-01",
      "2024-02-01",
      "2024-03-01",
    ]);
  });
});
