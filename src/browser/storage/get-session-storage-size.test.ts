import { beforeEach, describe, expect, it } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { getSessionStorageSize } from "./index.js";

beforeEach(installStorageMocks);

describe("getSessionStorageSize", () => {
  it("estimates UTF-16 bytes as twice the key+value character count", () => {
    sessionStorage.setItem("ab", "cdef");
    expect(getSessionStorageSize()).toBe((2 + 4) * 2);
  });

  it("returns zero for an empty store", () => {
    expect(getSessionStorageSize()).toBe(0);
  });

  it("returns zero when storage is unusable", () => {
    installThrowingStorageMocks();
    expect(getSessionStorageSize()).toBe(0);
  });
});
