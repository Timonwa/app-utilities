import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks } from "./_test-helpers.js";
import {
  getLocalStorageItemWithExpiry,
  getSessionStorageItemWithExpiry,
  hasLocalStorageItem,
  setLocalStorageItemWithExpiry,
  setSessionStorageItemWithExpiry,
} from "./index.js";

beforeEach(installStorageMocks);

describe("expiry", () => {
  it("returns the value before expiry and evicts after, in both storages", () => {
    setLocalStorageItemWithExpiry("token", "abc", 60_000);
    expect(getLocalStorageItemWithExpiry<string>("token")).toBe("abc");
    setLocalStorageItemWithExpiry("stale", "x", -1);
    expect(getLocalStorageItemWithExpiry("stale")).toBeUndefined();
    expect(hasLocalStorageItem("stale")).toBe(false); // evicted on access

    setSessionStorageItemWithExpiry("draft", { step: 2 }, 60_000);
    expect(getSessionStorageItemWithExpiry<{ step: number }>("draft")).toEqual({
      step: 2,
    });
  });

  it("honours the expiry boundary exactly", () => {
    vi.useFakeTimers();
    try {
      setLocalStorageItemWithExpiry("boundary", "v", 60_000);
      vi.advanceTimersByTime(60_000);
      // Eviction is strictly-after: at the exact expiry instant the value survives.
      expect(getLocalStorageItemWithExpiry("boundary")).toBe("v");
      vi.advanceTimersByTime(1);
      expect(getLocalStorageItemWithExpiry("boundary")).toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it("treats a payload without the expiry envelope as missing", () => {
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      localStorage.setItem("legacy", "not json");
      expect(getLocalStorageItemWithExpiry("legacy")).toBeUndefined();
    } finally {
      silence.mockRestore();
    }
  });
});
