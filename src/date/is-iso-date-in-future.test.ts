import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isISODateInFuture } from "./index.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-01-15T12:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isISODateInFuture", () => {
  it("returns true strictly after now", () => {
    expect(isISODateInFuture("2024-01-15T12:00:01.000Z")).toBe(true);
  });

  it("returns false for now itself and the past", () => {
    expect(isISODateInFuture("2024-01-15T12:00:00.000Z")).toBe(false);
    expect(isISODateInFuture("2024-01-15T11:59:59.000Z")).toBe(false);
  });

  it("returns false for garbage input", () => {
    expect(isISODateInFuture("junk")).toBe(false);
  });
});
