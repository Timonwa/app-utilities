import { beforeEach, describe, expect, it } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { isSessionStorageAvailable } from "./index.js";

beforeEach(installStorageMocks);

describe("isSessionStorageAvailable", () => {
  it("returns true when sessionStorage accepts writes", () => {
    expect(isSessionStorageAvailable()).toBe(true);
  });

  it("cleans up its probe key", () => {
    isSessionStorageAvailable();
    expect(sessionStorage.length).toBe(0);
  });

  it("returns false when sessionStorage throws", () => {
    installThrowingStorageMocks();
    expect(isSessionStorageAvailable()).toBe(false);
  });
});
