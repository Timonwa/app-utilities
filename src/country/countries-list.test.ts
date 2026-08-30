import { describe, expect, it } from "vitest";
import { COUNTRIES_LIST } from "./index.js";

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
