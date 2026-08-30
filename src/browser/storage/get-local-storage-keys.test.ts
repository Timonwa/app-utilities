import { beforeEach, describe, expect, it } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { getLocalStorageKeys, setLocalStorageItem } from "./index.js";

beforeEach(installStorageMocks);

describe("getLocalStorageKeys", () => {
  it("lists every stored key", () => {
    setLocalStorageItem("user", 1);
    setLocalStorageItem("settings", 2);
    expect(getLocalStorageKeys().sort()).toEqual(["settings", "user"]);
  });

  it("returns an empty array when nothing is stored", () => {
    expect(getLocalStorageKeys()).toEqual([]);
  });

  it("returns an empty array when storage is unusable", () => {
    installThrowingStorageMocks();
    expect(getLocalStorageKeys()).toEqual([]);
  });
});
