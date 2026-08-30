import { describe, expect, it } from "vitest";
import { extractTimeFromISOString } from "./index.js";

describe("extractTimeFromISOString", () => {
  it("returns everything after the T verbatim", () => {
    expect(extractTimeFromISOString("2024-01-15T10:30:00.000Z")).toBe("10:30:00.000Z");
  });

  it("returns an empty string when there is no time portion", () => {
    expect(extractTimeFromISOString("2024-01-15")).toBe("");
    expect(extractTimeFromISOString("")).toBe("");
  });
});
