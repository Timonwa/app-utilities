import { describe, expect, it } from "vitest";
import { convertMillisToDate } from "./index.js";

describe("convertMillisToDate", () => {
  it("wraps the millis in a Date at the same instant", () => {
    expect(convertMillisToDate(1_705_276_800_000).toISOString()).toBe(
      "2024-01-15T00:00:00.000Z",
    );
  });

  it("handles the epoch and negative (pre-1970) millis", () => {
    expect(convertMillisToDate(0).getTime()).toBe(0);
    expect(convertMillisToDate(-86_400_000).toISOString()).toBe(
      "1969-12-31T00:00:00.000Z",
    );
  });
});
