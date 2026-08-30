import { beforeEach, describe, expect, it } from "vitest";
import { installStorageMocks, installThrowingStorageMocks } from "./_test-helpers.js";
import { isLocalStorageAvailable, isSessionStorageAvailable } from "./index.js";

beforeEach(installStorageMocks);

describe("availability", () => {
  it("reports available with a working store", () => {
    expect(isLocalStorageAvailable()).toBe(true);
  });

  it("covers sessionStorage with the same probe", () => {
    expect(isSessionStorageAvailable()).toBe(true);
  });

  it("reports unavailable when touching storage throws", () => {
    installThrowingStorageMocks();
    expect(isLocalStorageAvailable()).toBe(false);
    expect(isSessionStorageAvailable()).toBe(false);
  });
});
