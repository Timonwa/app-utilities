import { describe, expect, it } from "vitest";
import { groupArrayByConsecutiveKey } from "./index.js";

describe("groupArrayByConsecutiveKey", () => {
  it("groups adjacent runs and keeps non-adjacent ones separate", () => {
    const grouped = groupArrayByConsecutiveKey(
      [{ c: "a" }, { c: "a" }, { c: "b" }, { c: "a" }],
      (item) => item.c,
    );
    expect(grouped.map((g) => `${g.key}:${g.items.length}`)).toEqual([
      "a:2",
      "b:1",
      "a:1",
    ]);
  });

  it("collapses a list sharing one key into a single group", () => {
    const grouped = groupArrayByConsecutiveKey(
      [{ c: "a" }, { c: "a" }],
      (item) => item.c,
    );
    expect(grouped).toEqual([{ key: "a", items: [{ c: "a" }, { c: "a" }] }]);
  });

  it("keeps the original item references inside the groups", () => {
    const first = { c: "a", n: 1 };
    const grouped = groupArrayByConsecutiveKey([first], (item) => item.c);
    expect(grouped[0]?.items[0]).toBe(first);
  });

  it("returns no groups for an empty array", () => {
    expect(groupArrayByConsecutiveKey([], () => "x")).toEqual([]);
  });
});
