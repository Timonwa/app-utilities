import { describe, expect, it } from "vitest";
import { getCountryByCode } from "./index.js";

describe("getCountryByCode", () => {
  it("matches case-insensitively and trims", () => {
    expect(getCountryByCode("NG")?.name).toBe("Nigeria");
    expect(getCountryByCode(" ng ")?.name).toBe("Nigeria");
    expect(getCountryByCode("XX")).toBeUndefined();
  });

  it("returns the full record", () => {
    expect(getCountryByCode("ng")).toEqual({
      name: "Nigeria",
      flag: "🇳🇬",
      code: "NG",
      dialCode: "+234",
    });
  });

  it("tolerates empty input", () => {
    expect(getCountryByCode("")).toBeUndefined();
  });
});
