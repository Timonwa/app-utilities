import { describe, expect, it } from "vitest";
import { floorDateTimeLocalToHalfHour, floorDateTimeLocalToHour } from "./index.js";

describe("datetime-local flooring", () => {
  it("floors to hour and half-hour", () => {
    expect(floorDateTimeLocalToHour("2026-09-23T10:42")).toBe("2026-09-23T10:00");
    expect(floorDateTimeLocalToHalfHour("2026-09-23T10:42")).toBe("2026-09-23T10:30");
    expect(floorDateTimeLocalToHalfHour("2026-09-23T10:12")).toBe("2026-09-23T10:00");
  });

  it("leaves values already on the boundary alone", () => {
    expect(floorDateTimeLocalToHalfHour("2026-09-23T10:30")).toBe("2026-09-23T10:30");
    expect(floorDateTimeLocalToHalfHour("2026-09-23T10:00")).toBe("2026-09-23T10:00");
    expect(floorDateTimeLocalToHour("2026-09-23T10:00")).toBe("2026-09-23T10:00");
  });

  it("returns empty for empty input", () => {
    expect(floorDateTimeLocalToHalfHour("")).toBe("");
    expect(floorDateTimeLocalToHour("")).toBe("");
  });
});
