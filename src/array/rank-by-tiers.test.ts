import { describe, expect, it } from "vitest";
import { rankByTiers } from "./index.js";

describe("rankByTiers", () => {
  it("ranks by the first matching predicate, unmatched last", () => {
    const rank = rankByTiers<{ state: string }>([
      (item) => item.state === "live",
      (item) => item.state === "upcoming",
    ]);
    expect(rank({ state: "live" })).toBe(0);
    expect(rank({ state: "upcoming" })).toBe(1);
    expect(rank({ state: "ended" })).toBe(2);
  });

  it("takes the earliest tier when several predicates match", () => {
    const rank = rankByTiers<number>([(n) => n > 0, (n) => n > 10]);
    expect(rank(20)).toBe(0);
  });

  it("ranks everything equally with no tiers", () => {
    const rank = rankByTiers<number>([]);
    expect(rank(1)).toBe(0);
    expect(rank(2)).toBe(0);
  });

  it("orders a list into bands when used in a sort comparator", () => {
    const rank = rankByTiers<string>([(s) => s === "live", (s) => s === "upcoming"]);
    const sorted = ["ended", "upcoming", "live", "ended"].sort(
      (a, b) => rank(a) - rank(b),
    );
    expect(sorted).toEqual(["live", "upcoming", "ended", "ended"]);
  });
});
