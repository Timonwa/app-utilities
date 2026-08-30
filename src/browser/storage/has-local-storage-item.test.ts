import { beforeEach, describe, expect, it } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { hasLocalStorageItem, setLocalStorageItem } from "./index.js";

beforeEach(installStorageMocks);

describe("hasLocalStorageItem", () => {
  it("returns true for a stored key, even a falsy value", () => {
    setLocalStorageItem("zero", 0);
    expect(hasLocalStorageItem("zero")).toBe(true);
  });

  it("returns false for a missing key", () => {
    expect(hasLocalStorageItem("missing")).toBe(false);
  });

  it("returns false when storage is unusable", () => {
    installThrowingStorageMocks();
    expect(hasLocalStorageItem("k")).toBe(false);
  });
});
