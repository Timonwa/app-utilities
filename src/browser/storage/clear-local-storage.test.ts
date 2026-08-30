import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import {
  clearLocalStorage,
  getLocalStorageKeys,
  setLocalStorageItem,
  setSessionStorageItem,
} from "./index.js";

beforeEach(installStorageMocks);

describe("clearLocalStorage", () => {
  it("removes every localStorage key and leaves sessionStorage alone", () => {
    setLocalStorageItem("a", 1);
    setLocalStorageItem("b", 2);
    setSessionStorageItem("keep", 3);
    clearLocalStorage();
    expect(getLocalStorageKeys()).toEqual([]);
    expect(sessionStorage.getItem("keep")).toBe("3");
  });

  it("is a no-op on an already-empty store", () => {
    expect(() => clearLocalStorage()).not.toThrow();
  });

  it("logs instead of throwing when storage is unusable", () => {
    installThrowingStorageMocks();
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => clearLocalStorage()).not.toThrow();
      expect(silence).toHaveBeenCalled();
    } finally {
      silence.mockRestore();
    }
  });
});
