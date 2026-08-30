import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import {
  hasSessionStorageItem,
  removeSessionStorageItem,
  setSessionStorageItem,
} from "./index.js";

beforeEach(installStorageMocks);

describe("removeSessionStorageItem", () => {
  it("removes a stored key", () => {
    setSessionStorageItem("temp", 1);
    removeSessionStorageItem("temp");
    expect(hasSessionStorageItem("temp")).toBe(false);
  });

  it("logs instead of throwing when storage is unusable", () => {
    installThrowingStorageMocks();
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => removeSessionStorageItem("k")).not.toThrow();
      expect(silence).toHaveBeenCalled();
    } finally {
      silence.mockRestore();
    }
  });
});
