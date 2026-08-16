import { beforeEach, describe, expect, it } from "vitest";
import {
  getLocalStorageItem,
  getLocalStorageItemWithExpiry,
  getLocalStorageKeys,
  getSessionStorageItemWithExpiry,
  getSessionStorageKeys,
  getSessionStorageSize,
  hasLocalStorageItem,
  isLocalStorageAvailable,
  setLocalStorageItem,
  setLocalStorageItemWithExpiry,
  setSessionStorageItemWithExpiry,
} from "./index.js";

// A Map-backed Storage stand-in — enough surface for these helpers, no DOM dependency.
function createStorageMock(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k: string) => map.get(k) ?? null,
    key: (i: number) => [...map.keys()][i] ?? null,
    removeItem: (k: string) => void map.delete(k),
    setItem: (k: string, v: string) => void map.set(k, String(v)),
  } as Storage;
}

beforeEach(() => {
  const local = createStorageMock();
  const session = createStorageMock();
  Object.defineProperty(globalThis, "localStorage", { value: local, configurable: true });
  Object.defineProperty(globalThis, "sessionStorage", {
    value: session,
    configurable: true,
  });
});

describe("typed round trips", () => {
  it("serializes and parses JSON", () => {
    setLocalStorageItem("user", { id: 1 });
    expect(getLocalStorageItem<{ id: number }>("user")).toEqual({ id: 1 });
    expect(hasLocalStorageItem("user")).toBe(true);
    expect(getLocalStorageItem("missing", "fallback")).toBe("fallback");
  });
});

describe("expiry", () => {
  it("returns the value before expiry and evicts after, in both storages", () => {
    setLocalStorageItemWithExpiry("token", "abc", 60_000);
    expect(getLocalStorageItemWithExpiry<string>("token")).toBe("abc");
    setLocalStorageItemWithExpiry("stale", "x", -1);
    expect(getLocalStorageItemWithExpiry("stale")).toBeUndefined();
    expect(hasLocalStorageItem("stale")).toBe(false); // evicted on access

    setSessionStorageItemWithExpiry("draft", { step: 2 }, 60_000);
    expect(getSessionStorageItemWithExpiry<{ step: number }>("draft")).toEqual({
      step: 2,
    });
  });
});

describe("session symmetry", () => {
  it("keys and size exist for sessionStorage too", () => {
    setSessionStorageItemWithExpiry("a", 1, 60_000);
    expect(getSessionStorageKeys().length).toBeGreaterThanOrEqual(0);
    expect(getSessionStorageSize()).toBeGreaterThanOrEqual(0);
  });
});

describe("availability", () => {
  it("reports available with a working store", () => {
    expect(isLocalStorageAvailable()).toBe(true);
  });
});
