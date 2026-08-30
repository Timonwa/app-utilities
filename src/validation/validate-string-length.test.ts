import { describe, expect, it } from "vitest";
import { validateNumberRange, validateStringLength } from "./index.js";

describe("form validators", () => {
  it("lengths and ranges name the field", () => {
    expect(validateStringLength("hi", 3, 10, "Bio").message).toContain("Bio");
    expect(validateNumberRange(11, 1, 10).message).toBe("Value must be no more than 10");
  });

  it("treats both bounds as inclusive", () => {
    expect(validateStringLength("abc", 3, 10).valid).toBe(true);
    expect(validateStringLength("abcdefghij", 3, 10).valid).toBe(true);
    expect(validateStringLength("ab", 3, 10).valid).toBe(false);
    expect(validateStringLength("abcdefghijk", 3, 10).valid).toBe(false);
  });

  it("defaults the field name to Field", () => {
    expect(validateStringLength("", 1, 5).message).toBe(
      "Field must be at least 1 characters",
    );
  });
});
