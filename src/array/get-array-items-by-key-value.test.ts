import { describe, expect, it } from "vitest";
import { getArrayItemsByKeyValue } from "./index.js";

describe("getArrayItemsByKeyValue", () => {
  it("returns every item whose key strictly equals the value", () => {
    const users = [
      { role: "admin", name: "Ada" },
      { role: "user", name: "Ben" },
      { role: "admin", name: "Chi" },
    ];
    expect(getArrayItemsByKeyValue(users, "role", "admin")).toEqual([
      { role: "admin", name: "Ada" },
      { role: "admin", name: "Chi" },
    ]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(getArrayItemsByKeyValue([{ role: "user" }], "role", "admin")).toEqual([]);
  });

  it('uses strict equality, so 1 does not match "1"', () => {
    expect(getArrayItemsByKeyValue([{ id: 1 }], "id", "1")).toEqual([]);
    expect(getArrayItemsByKeyValue([{ id: 1 }], "id", 1)).toEqual([{ id: 1 }]);
  });

  it("returns an empty array for an empty or nullish source", () => {
    expect(getArrayItemsByKeyValue([], "role", "admin")).toEqual([]);
    const nothing = null as unknown as Array<Record<string, unknown>>;
    expect(getArrayItemsByKeyValue(nothing, "role", "admin")).toEqual([]);
  });

  it("returns an empty array for a nullish key", () => {
    const key = null as unknown as "role";
    expect(getArrayItemsByKeyValue([{ role: "admin" }], key, "admin")).toEqual([]);
  });

  it("matches items where the key is absent when the value is undefined", () => {
    const mixed = [{ role: "admin" }, { name: "no role" }];
    expect(getArrayItemsByKeyValue(mixed, "role", undefined)).toEqual([
      { name: "no role" },
    ]);
  });
});
