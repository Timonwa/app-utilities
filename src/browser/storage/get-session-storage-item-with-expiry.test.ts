import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks } from "./_test-helpers.js";
import {
  getSessionStorageItemWithExpiry,
  hasSessionStorageItem,
  setSessionStorageItemWithExpiry,
} from "./index.js";

beforeEach(() => {
  installStorageMocks();
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getSessionStorageItemWithExpiry", () => {
  it("returns the value while it is still fresh", () => {
    setSessionStorageItemWithExpiry("draft", "text", 60_000);
    vi.advanceTimersByTime(59_999);
    expect(getSessionStorageItemWithExpiry<string>("draft")).toBe("text");
  });

  it("returns undefined once expired and evicts the entry", () => {
    setSessionStorageItemWithExpiry("draft", "text", 60_000);
    vi.advanceTimersByTime(60_001);
    expect(getSessionStorageItemWithExpiry<string>("draft")).toBeUndefined();
    expect(hasSessionStorageItem("draft")).toBe(false);
  });

  it("returns undefined for a missing key", () => {
    expect(getSessionStorageItemWithExpiry("missing")).toBeUndefined();
  });
});
