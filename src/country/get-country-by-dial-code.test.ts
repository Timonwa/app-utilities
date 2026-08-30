import { describe, expect, it } from "vitest";
import { getCountryByDialCode } from "./index.js";

describe("getCountryByDialCode", () => {
  it("accepts the code with or without the plus", () => {
    expect(getCountryByDialCode("+234")?.code).toBe("NG");
    expect(getCountryByDialCode("234")?.code).toBe("NG");
  });

  // Documented: +1 is shared; first alphabetical match wins.
  it("returns a deterministic country for a shared dial code", () => {
    expect(getCountryByDialCode("+1")?.name).toBe("Canada");
  });

  it("distinguishes multi-digit codes from their prefix", () => {
    expect(getCountryByDialCode("+23")).toBeUndefined();
    expect(getCountryByDialCode("+1684")?.code).toBe("AS");
  });

  it("returns undefined for junk", () => {
    expect(getCountryByDialCode("abc")).toBeUndefined();
    expect(getCountryByDialCode("")).toBeUndefined();
  });
});
