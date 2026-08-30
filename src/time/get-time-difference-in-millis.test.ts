import { describe, expect, it } from "vitest";
import { getTimeDifferenceInMillis } from "./index.js";

describe("getTimeDifferenceInMillis", () => {
  it("returns the span between two HH:MM times", () => {
    expect(getTimeDifferenceInMillis("14:00", "16:30")).toBe(9_000_000);
  });

  it("supports HH:MM:SS precision", () => {
    expect(getTimeDifferenceInMillis("14:00:00", "14:00:30")).toBe(30_000);
  });

  it("is signed — a later start gives a negative result", () => {
    expect(getTimeDifferenceInMillis("16:30", "14:00")).toBe(-9_000_000);
  });

  it("returns zero for identical times", () => {
    expect(getTimeDifferenceInMillis("09:15", "09:15")).toBe(0);
  });
});
