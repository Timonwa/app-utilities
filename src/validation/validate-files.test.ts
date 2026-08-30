import { describe, expect, it } from "vitest";
import { file } from "./_test-helpers.js";
import { hasValidationErrors, validateFiles, validateFileType } from "./index.js";

describe("file validators", () => {
  it("batch validation aggregates", () => {
    const results = validateFiles([file("image/png"), file("text/plain")], (f) =>
      validateFileType(f, ["image/png"]),
    );
    expect(hasValidationErrors(results)).toBe(true);
    expect(results[0]?.valid).toBe(true);
  });

  it("returns one result per file, in order", () => {
    const results = validateFiles([file("image/png"), file("image/png")], (f) =>
      validateFileType(f, ["image/png"]),
    );
    expect(results).toHaveLength(2);
    expect(hasValidationErrors(results)).toBe(false);
  });

  it("handles an empty list", () => {
    const results = validateFiles([], (f) => validateFileType(f, ["image/png"]));
    expect(results).toEqual([]);
    expect(hasValidationErrors(results)).toBe(false);
  });
});
