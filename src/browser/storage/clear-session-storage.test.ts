import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import {
  clearSessionStorage,
  getSessionStorageKeys,
  setLocalStorageItem,
  setSessionStorageItem,
} from "./index.js";

beforeEach(installStorageMocks);

describe("clearSessionStorage", () => {
  it("removes every sessionStorage key and leaves localStorage alone", () => {
    setSessionStorageItem("a", 1);
    setSessionStorageItem("b", 2);
    setLocalStorageItem("keep", 3);
    clearSessionStorage();
    expect(getSessionStorageKeys()).toEqual([]);
    expect(localStorage.getItem("keep")).toBe("3");
  });

  it("logs instead of throwing when storage is unusable", () => {
    installThrowingStorageMocks();
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => clearSessionStorage()).not.toThrow();
      expect(silence).toHaveBeenCalled();
    } finally {
      silence.mockRestore();
    }
  });
});
