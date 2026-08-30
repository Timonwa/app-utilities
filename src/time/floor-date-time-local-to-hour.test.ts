import { describe, expect, it } from "vitest";
import { floorDateTimeLocalToHour } from "./index.js";

describe("floorDateTimeLocalToHour", () => {
  it("floors minutes to the top of the hour", () => {
    expect(floorDateTimeLocalToHour("2026-09-23T10:42")).toBe("2026-09-23T10:00");
    expect(floorDateTimeLocalToHour("2026-09-23T10:59")).toBe("2026-09-23T10:00");
  });

  it("leaves an on-the-hour value unchanged", () => {
    expect(floorDateTimeLocalToHour("2026-09-23T10:00")).toBe("2026-09-23T10:00");
  });

  it("returns an empty string for empty input", () => {
    expect(floorDateTimeLocalToHour("")).toBe("");
  });
});
