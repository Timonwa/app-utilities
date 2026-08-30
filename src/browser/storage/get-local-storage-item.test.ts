import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks } from "./_test-helpers.js";
import {
  getLocalStorageItem,
  hasLocalStorageItem,
  setLocalStorageItem,
} from "./index.js";

beforeEach(installStorageMocks);

describe("typed round trips", () => {
  it("serializes and parses JSON", () => {
    setLocalStorageItem("user", { id: 1 });
    expect(getLocalStorageItem<{ id: number }>("user")).toEqual({ id: 1 });
    expect(hasLocalStorageItem("user")).toBe(true);
    expect(getLocalStorageItem("missing", "fallback")).toBe("fallback");
  });

  it("round-trips primitives, not just objects", () => {
    setLocalStorageItem("count", 42);
    setLocalStorageItem("enabled", false);
    expect(getLocalStorageItem<number>("count")).toBe(42);
    expect(getLocalStorageItem<boolean>("enabled")).toBe(false);
  });

  it("returns the default for corrupted JSON", () => {
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      localStorage.setItem("broken", "{not json");
      expect(getLocalStorageItem("broken", "fallback")).toBe("fallback");
    } finally {
      silence.mockRestore();
    }
  });

  it("returns undefined for a missing key with no default", () => {
    expect(getLocalStorageItem("missing")).toBeUndefined();
    expect(hasLocalStorageItem("missing")).toBe(false);
  });
});
