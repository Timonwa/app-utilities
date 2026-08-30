import { beforeEach, describe, expect, it } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { hasSessionStorageItem, setSessionStorageItem } from "./index.js";

beforeEach(installStorageMocks);

describe("hasSessionStorageItem", () => {
  it("returns true for a stored key", () => {
    setSessionStorageItem("tempData", { step: 1 });
    expect(hasSessionStorageItem("tempData")).toBe(true);
  });

  it("returns false for a missing key", () => {
    expect(hasSessionStorageItem("missing")).toBe(false);
  });

  it("returns false when storage is unusable", () => {
    installThrowingStorageMocks();
    expect(hasSessionStorageItem("k")).toBe(false);
  });
});
