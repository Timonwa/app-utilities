import { describe, expect, it } from "vitest";

describe("add/subtract symmetry", () => {
  it("every add* has a subtract* mirror, and they invert each other", async () => {
    const api = await import("./index.js");
    const adds = Object.keys(api).filter((k) => k.startsWith("add"));
    for (const add of adds) {
      const mirror = add.replace(/^add(\w+?)To/, "subtract$1From");
      expect(api, `${add} has no ${mirror}`).toHaveProperty(mirror);
    }
    expect(adds.length).toBeGreaterThanOrEqual(15);
  });

  it("subtract inverts add across all three representations", async () => {
    const api = await import("./index.js");
    const date = new Date(2024, 5, 15, 12);
    expect(api.subtractMonthsFromDate(api.addMonthsToDate(date, 3), 3).getTime()).toBe(
      date.getTime(),
    );
    const iso = "2024-06-15T12:00:00.000Z";
    expect(api.subtractHoursFromISODate(api.addHoursToISODate(iso, 5), 5)).toBe(iso);
    const millis = date.getTime();
    expect(api.subtractYearsFromMillis(api.addYearsToMillis(millis, 2), 2)).toBe(millis);
  });
});
