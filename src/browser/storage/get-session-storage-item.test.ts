import { beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks } from "./_test-helpers.js";
import { getSessionStorageItem, setSessionStorageItem } from "./index.js";

beforeEach(installStorageMocks);

describe("getSessionStorageItem", () => {
  it("parses stored JSON back into its value", () => {
    setSessionStorageItem("tempData", { step: 1 });
    expect(getSessionStorageItem<{ step: number }>("tempData")).toEqual({ step: 1 });
  });

  it("returns the default for a missing key, undefined without one", () => {
    expect(getSessionStorageItem("missing", "fallback")).toBe("fallback");
    expect(getSessionStorageItem("missing")).toBeUndefined();
  });

  it("returns the default for corrupted JSON", () => {
    const silence = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      sessionStorage.setItem("broken", "{not json");
      expect(getSessionStorageItem("broken", "fallback")).toBe("fallback");
    } finally {
      silence.mockRestore();
    }
  });

  it("round-trips primitives", () => {
    setSessionStorageItem("n", 7);
    expect(getSessionStorageItem<number>("n")).toBe(7);
  });
});
