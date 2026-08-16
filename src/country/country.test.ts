import { describe, expect, it } from "vitest";
import {
  COUNTRIES_LIST,
  getCountryByCode,
  getCountryByDialCode,
  getCountryByName,
  searchCountriesByName,
} from "./index.js";

describe("COUNTRIES_LIST", () => {
  it("covers the world, sorted by name, with unique codes", () => {
    expect(COUNTRIES_LIST.length).toBeGreaterThanOrEqual(240);
    const codes = COUNTRIES_LIST.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
    const names = COUNTRIES_LIST.map((c) => c.name);
    // Collator compare because of entries like "Åland Islands".
    expect(names.slice(0, 3)).toEqual(["Afghanistan", "Åland Islands", "Albania"]);
  });

  it("every entry is complete", () => {
    for (const country of COUNTRIES_LIST) {
      expect(country.name).toBeTruthy();
      expect(country.flag).toBeTruthy();
      expect(country.code).toMatch(/^[A-Z]{2}$/);
      expect(country.dialCode).toMatch(/^\+\d+$/);
    }
  });
});

describe("getCountryByCode", () => {
  it("matches case-insensitively and trims", () => {
    expect(getCountryByCode("NG")?.name).toBe("Nigeria");
    expect(getCountryByCode(" ng ")?.name).toBe("Nigeria");
    expect(getCountryByCode("XX")).toBeUndefined();
  });
});

describe("getCountryByDialCode", () => {
  it("accepts the code with or without the plus", () => {
    expect(getCountryByDialCode("+234")?.code).toBe("NG");
    expect(getCountryByDialCode("234")?.code).toBe("NG");
  });

  // Documented: +1 is shared; first alphabetical match wins.
  it("returns a deterministic country for a shared dial code", () => {
    expect(getCountryByDialCode("+1")?.name).toBe("Canada");
  });
});

describe("name lookups", () => {
  it("searches by substring, exact-matches by full name", () => {
    expect(searchCountriesByName("guinea").length).toBeGreaterThanOrEqual(4);
    expect(getCountryByName(" NIGERIA ")?.code).toBe("NG");
    expect(getCountryByName("nige")).toBeUndefined();
  });

  it("returns the full list for an empty query", () => {
    expect(searchCountriesByName("")).toHaveLength(COUNTRIES_LIST.length);
  });
});
