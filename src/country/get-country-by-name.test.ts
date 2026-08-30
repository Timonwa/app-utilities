import { describe, expect, it } from "vitest";
import { getCountryByName, searchCountriesByName } from "./index.js";

describe("name lookups", () => {
  it("searches by substring, exact-matches by full name", () => {
    expect(searchCountriesByName("guinea").length).toBeGreaterThanOrEqual(4);
    expect(getCountryByName(" NIGERIA ")?.code).toBe("NG");
    expect(getCountryByName("nige")).toBeUndefined();
  });

  it("matches accented names exactly", () => {
    expect(getCountryByName("åland islands")?.code).toBe("AX");
  });

  it("returns undefined for empty input", () => {
    expect(getCountryByName("")).toBeUndefined();
  });
});
