import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { getLocalStorageItem, setLocalStorageItem } from "./index.js";

beforeEach(installStorageMocks);

describe("setLocalStorageItem", () => {
  it("JSON-serializes objects, primitives, and arrays", () => {
    setLocalStorageItem("user", { id: 1, name: "John" });
    expect(localStorage.getItem("user")).toBe('{"id":1,"name":"John"}');
    setLocalStorageItem("count", 42);
    expect(localStorage.getItem("count")).toBe("42");
    setLocalStorageItem("list", [1, 2]);
    expect(getLocalStorageItem<number[]>("list")).toEqual([1, 2]);
  });

  it("overwrites an existing key", () => {
    setLocalStorageItem("k", "a");
    setLocalStorageItem("k", "b");
    expect(getLocalStorageItem<string>("k")).toBe("b");
  });

  it("logs instead of throwing when storage is unusable", () => {
    installThrowingStorageMocks();
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => setLocalStorageItem("k", "v")).not.toThrow();
      expect(silence).toHaveBeenCalled();
    } finally {
      silence.mockRestore();
    }
  });
});
