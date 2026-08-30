import { describe, expect, it } from "vitest";
import { file } from "./_test-helpers.js";
import { validatePdfFile } from "./index.js";

describe("validatePdfFile", () => {
  it("accepts application/pdf", () => {
    expect(validatePdfFile(file("application/pdf"))).toEqual({ valid: true });
  });

  it("rejects any other type", () => {
    expect(validatePdfFile(file("application/msword")).valid).toBe(false);
    expect(validatePdfFile(file("image/png")).valid).toBe(false);
    expect(validatePdfFile(file("")).valid).toBe(false);
  });
});
