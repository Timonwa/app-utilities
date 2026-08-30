import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isISODateInPast } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-01-15T12:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isISODateInPast", () => {
  it("returns true strictly before now", () => {
    expect(isISODateInPast("2024-01-15T11:59:59.000Z")).toBe(true);
  });

  it("returns false for now itself and the future", () => {
    expect(isISODateInPast("2024-01-15T12:00:00.000Z")).toBe(false);
    expect(isISODateInPast("2024-01-15T12:00:01.000Z")).toBe(false);
  });

  it("returns false for garbage input", () => {
    expect(isISODateInPast("junk")).toBe(false);
  });
});
