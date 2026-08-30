import { beforeEach, describe, expect, it } from "vitest";
import { installStorageMocks } from "./_test-helpers.js";
import {
  getLocalStorageKeys,
  getSessionStorageKeys,
  getSessionStorageSize,
  setSessionStorageItem,
  setSessionStorageItemWithExpiry,
} from "./index.js";

beforeEach(installStorageMocks);

describe("session symmetry", () => {
  it("keys and size exist for sessionStorage too", () => {
    setSessionStorageItemWithExpiry("a", 1, 60_000);
    expect(getSessionStorageKeys().length).toBeGreaterThanOrEqual(0);
    expect(getSessionStorageSize()).toBeGreaterThanOrEqual(0);
  });

  it("lists exactly the stored keys", () => {
    setSessionStorageItem("step", 1);
    setSessionStorageItem("draft", "x");
    expect(getSessionStorageKeys().sort()).toEqual(["draft", "step"]);
  });

  it("sizes at two bytes per stored character", () => {
    setSessionStorageItem("k", "ab");
    // Stored as the 4-char JSON string "ab" under the 1-char key.
    expect(getSessionStorageSize()).toBe(2 * (1 + 4));
  });

  it("the two storages are independent", () => {
    setSessionStorageItem("only-session", 1);
    expect(getLocalStorageKeys()).toEqual([]);
  });
});
