import { describe, expect, it } from "vitest";
import { isISODateBefore } from "./index.js";

describe("isISODateBefore", () => {
  it("returns true only when the first is strictly earlier", () => {
    expect(isISODateBefore("2024-01-15", "2024-01-16")).toBe(true);
    expect(isISODateBefore("2024-01-16", "2024-01-15")).toBe(false);
  });

  it("returns false for equal instants", () => {
    expect(isISODateBefore("2024-01-15T10:00:00.000Z", "2024-01-15T10:00:00.000Z")).toBe(
      false,
    );
  });

  it("compares full timestamps within a day", () => {
    expect(isISODateBefore("2024-01-15T09:00:00.000Z", "2024-01-15T10:00:00.000Z")).toBe(
      true,
    );
  });
});
