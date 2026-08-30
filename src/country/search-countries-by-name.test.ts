import { describe, expect, it } from "vitest";
import { COUNTRIES_LIST, searchCountriesByName } from "./index.js";

describe("searchCountriesByName", () => {
  it("returns the full list for an empty query", () => {
    expect(searchCountriesByName("")).toHaveLength(COUNTRIES_LIST.length);
  });

  it("matches case-insensitively anywhere in the name", () => {
    const names = searchCountriesByName("SOUTH").map((c) => c.name);
    expect(names).toContain("South Africa");
    expect(names).toContain("South Sudan");
  });

  it("trims the query and returns a fresh array", () => {
    expect(searchCountriesByName("  nigeria  ")).toHaveLength(1);
    // The empty-query result must be a copy, not the module's own list.
    expect(searchCountriesByName("")).not.toBe(COUNTRIES_LIST);
  });

  it("returns an empty list for no matches", () => {
    expect(searchCountriesByName("atlantis")).toEqual([]);
  });
});
