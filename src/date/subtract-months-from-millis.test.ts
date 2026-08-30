import { describe, expect, it } from "vitest";
import { addMonthsToMillis, subtractMonthsFromMillis } from "./index.js";

describe("subtractMonthsFromMillis", () => {
  it("moves back by calendar months", () => {
    const mar15 = new Date(2024, 2, 15, 12).getTime();
    expect(new Date(subtractMonthsFromMillis(mar15, 2)).getMonth()).toBe(0);
  });

  it("round-trips with addMonthsToMillis for mid-month dates", () => {
    const jan15 = new Date(2024, 0, 15, 12).getTime();
    expect(subtractMonthsFromMillis(addMonthsToMillis(jan15, 3), 3)).toBe(jan15);
  });
});
