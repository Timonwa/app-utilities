import { describe, expect, it } from "vitest";
import { getArraySortedByKey } from "./index.js";

describe("getArraySortedByKey", () => {
  it("sorts numbers numerically, both directions", () => {
    expect(getArraySortedByKey([{ n: 30 }, { n: 20 }], "n")).toEqual([
      { n: 20 },
      { n: 30 },
    ]);
    expect(getArraySortedByKey([{ n: 20 }, { n: 30 }], "n", "desc")).toEqual([
      { n: 30 },
      { n: 20 },
    ]);
  });

  it("sorts embedded numbers naturally, not lexically", () => {
    const sorted = getArraySortedByKey(
      [{ t: "item 10" }, { t: "item 9" }, { t: "item 1" }],
      "t",
    );
    // A plain string sort puts "item 10" before "item 9".
    expect(sorted.map((x) => x.t)).toEqual(["item 1", "item 9", "item 10"]);
  });

  it("sorts dates chronologically", () => {
    const sorted = getArraySortedByKey(
      [{ d: new Date("2026-03-01") }, { d: new Date("2026-01-01") }],
      "d",
    );
    expect(sorted[0]?.d.getMonth()).toBe(0);
  });
});
