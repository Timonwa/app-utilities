import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks } from "./_test-helpers.js";
import { getLocalStorageItemWithExpiry, setLocalStorageItemWithExpiry } from "./index.js";

beforeEach(() => {
  installStorageMocks();
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("setLocalStorageItemWithExpiry", () => {
  it("stores the value with an absolute expiry timestamp", () => {
    setLocalStorageItemWithExpiry("token", "abc123", 3_600_000);
    expect(JSON.parse(localStorage.getItem("token") as string)).toEqual({
      value: "abc123",
      expiry: Date.now() + 3_600_000,
    });
  });

  it("round-trips while unexpired", () => {
    setLocalStorageItemWithExpiry("token", "abc123", 3_600_000);
    vi.advanceTimersByTime(3_599_999);
    expect(getLocalStorageItemWithExpiry<string>("token")).toBe("abc123");
  });

  it("a zero lifetime expires immediately on the next tick", () => {
    setLocalStorageItemWithExpiry("token", "abc123", 0);
    vi.advanceTimersByTime(1);
    expect(getLocalStorageItemWithExpiry<string>("token")).toBeUndefined();
  });
});
