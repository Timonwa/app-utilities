import { describe, expect, it } from "vitest";
import { isMaintenanceError } from "./index.js";

describe("isMaintenanceError", () => {
  it("matches the structured code and the message substring", () => {
    expect(isMaintenanceError({ code: "PLATFORM_MAINTENANCE" })).toBe(true);
    expect(isMaintenanceError(new Error("Down for scheduled maintenance"))).toBe(true);
    expect(isMaintenanceError(new Error("boom"))).toBe(false);
  });

  it("takes the app's own contract as options", () => {
    expect(isMaintenanceError({ code: "MAINT" }, { code: "MAINT" })).toBe(true);
  });
});
