import { beforeEach, describe, expect, it } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { getLocalStorageSize } from "./index.js";

beforeEach(installStorageMocks);

describe("getLocalStorageSize", () => {
  it("estimates UTF-16 bytes as twice the key+value character count", () => {
    localStorage.setItem("ab", "cdef");
    expect(getLocalStorageSize()).toBe((2 + 4) * 2);
  });

  it("sums across entries", () => {
    localStorage.setItem("a", "1");
    localStorage.setItem("b", "23");
    expect(getLocalStorageSize()).toBe((1 + 1 + 1 + 2) * 2);
  });

  it("returns zero for an empty store", () => {
    expect(getLocalStorageSize()).toBe(0);
  });

  it("returns zero when storage is unusable", () => {
    installThrowingStorageMocks();
    expect(getLocalStorageSize()).toBe(0);
  });
});
