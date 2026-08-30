import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { getSessionStorageItem, setSessionStorageItem } from "./index.js";

beforeEach(installStorageMocks);

describe("setSessionStorageItem", () => {
  it("JSON-serializes into sessionStorage, not localStorage", () => {
    setSessionStorageItem("temp", { step: 1 });
    expect(sessionStorage.getItem("temp")).toBe('{"step":1}');
    expect(localStorage.getItem("temp")).toBeNull();
  });

  it("round-trips through getSessionStorageItem", () => {
    setSessionStorageItem("flag", false);
    expect(getSessionStorageItem<boolean>("flag")).toBe(false);
  });

  it("logs instead of throwing when storage is unusable", () => {
    installThrowingStorageMocks();
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => setSessionStorageItem("k", "v")).not.toThrow();
      expect(silence).toHaveBeenCalled();
    } finally {
      silence.mockRestore();
    }
  });
});
