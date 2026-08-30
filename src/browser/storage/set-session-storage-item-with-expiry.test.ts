import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { installStorageMocks } from "./_test-helpers.js";
import {
  getSessionStorageItemWithExpiry,
  setSessionStorageItemWithExpiry,
} from "./index.js";

beforeEach(() => {
  installStorageMocks();
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("setSessionStorageItemWithExpiry", () => {
  it("stores the value with an absolute expiry timestamp in sessionStorage", () => {
    setSessionStorageItemWithExpiry("draft", { body: "hi" }, 60_000);
    expect(JSON.parse(sessionStorage.getItem("draft") as string)).toEqual({
      value: { body: "hi" },
      expiry: Date.now() + 60_000,
    });
  });

  it("round-trips while unexpired", () => {
    setSessionStorageItemWithExpiry("draft", "text", 60_000);
    expect(getSessionStorageItemWithExpiry<string>("draft")).toBe("text");
  });
});
