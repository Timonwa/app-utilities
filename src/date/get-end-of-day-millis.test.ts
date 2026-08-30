import { describe, expect, it } from "vitest";
import { getEndOfDayMillis } from "./index.js";

describe("getEndOfDayMillis", () => {
  it("returns the last millisecond of the local day", () => {
    const millis = new Date(2024, 0, 15, 10, 30).getTime();
    expect(getEndOfDayMillis(millis)).toBe(
      new Date(2024, 0, 15, 23, 59, 59, 999).getTime(),
    );
  });

  it("is idempotent at the boundary itself", () => {
    const end = new Date(2024, 0, 15, 23, 59, 59, 999).getTime();
    expect(getEndOfDayMillis(end)).toBe(end);
  });
});
