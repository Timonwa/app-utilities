import { describe, expect, it } from "vitest";
import { getArrayItemById } from "./index.js";

describe("getArrayItemById", () => {
  it("finds by id", () => {
    expect(getArrayItemById([{ id: 1 }, { id: 2 }], 2)).toEqual({ id: 2 });
    expect(getArrayItemById([{ id: "a" }], "b")).toBeUndefined();
  });

  it("returns the first match when ids repeat", () => {
    const items = [
      { id: 1, label: "first" },
      { id: 1, label: "second" },
    ];
    expect(getArrayItemById(items, 1)?.label).toBe("first");
  });

  it("compares ids strictly, so a string never matches a number", () => {
    expect(getArrayItemById([{ id: 1 }], "1")).toBeUndefined();
  });

  it("returns undefined for a nullish id instead of scanning", () => {
    expect(getArrayItemById([{ id: 1 }], null as unknown as number)).toBeUndefined();
  });
});
