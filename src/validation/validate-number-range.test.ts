import { describe, expect, it } from "vitest";
import { validateNumberRange } from "./index.js";

describe("validateNumberRange", () => {
  it("accepts a value inside the range", () => {
    expect(validateNumberRange(5, 1, 10)).toEqual({ valid: true });
  });

  it("is inclusive at both bounds", () => {
    expect(validateNumberRange(1, 1, 10)).toEqual({ valid: true });
    expect(validateNumberRange(10, 1, 10)).toEqual({ valid: true });
  });

  it("rejects a value below the minimum with the default field name", () => {
    expect(validateNumberRange(0, 1, 10)).toEqual({
      valid: false,
      message: "Value must be at least 1",
    });
  });

  it("rejects a value above the maximum", () => {
    expect(validateNumberRange(11, 1, 10)).toEqual({
      valid: false,
      message: "Value must be no more than 10",
    });
  });

  it("uses a custom field name in the message", () => {
    expect(validateNumberRange(-1, 0, 5, "Quantity")).toEqual({
      valid: false,
      message: "Quantity must be at least 0",
    });
  });
});
