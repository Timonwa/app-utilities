import { describe, expect, it } from "vitest";
import { getArrayItemsBySearchTerm } from "./index.js";

describe("getArrayItemsBySearchTerm", () => {
  const people = [{ name: "Alice" }, { name: "Bob" }];

  it("matches case-insensitively on the given fields", () => {
    expect(getArrayItemsBySearchTerm(people, "ali", ["name"])).toEqual([
      { name: "Alice" },
    ]);
  });

  it("returns everything for an empty term, so an untouched search box shows the list", () => {
    expect(getArrayItemsBySearchTerm(people, "   ", ["name"])).toEqual(people);
  });

  it("returns nothing when there are no fields to search", () => {
    expect(getArrayItemsBySearchTerm(people, "ali", [])).toEqual([]);
  });

  it("matches when any of the fields contains the term, coercing non-strings", () => {
    const events = [
      { title: "Launch", year: 2026 },
      { title: "Recap", year: 2025 },
    ];
    expect(getArrayItemsBySearchTerm(events, "2026", ["title", "year"])).toEqual([
      { title: "Launch", year: 2026 },
    ]);
    expect(getArrayItemsBySearchTerm(events, "cap", ["title", "year"])).toEqual([
      { title: "Recap", year: 2025 },
    ]);
  });
});
