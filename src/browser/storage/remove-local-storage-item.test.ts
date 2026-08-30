import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import {
  hasLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "./index.js";

beforeEach(installStorageMocks);

describe("removeLocalStorageItem", () => {
  it("removes a stored key", () => {
    setLocalStorageItem("user", { id: 1 });
    removeLocalStorageItem("user");
    expect(hasLocalStorageItem("user")).toBe(false);
  });

  it("is a no-op for a missing key", () => {
    expect(() => removeLocalStorageItem("missing")).not.toThrow();
  });

  it("logs instead of throwing when storage is unusable", () => {
    installThrowingStorageMocks();
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => removeLocalStorageItem("k")).not.toThrow();
      expect(silence).toHaveBeenCalled();
    } finally {
      silence.mockRestore();
    }
  });
});
