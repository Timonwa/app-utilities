import { describe, expect, it } from "vitest";
import { file } from "./_test-helpers.js";
import { validateFileSize } from "./index.js";

describe("validateFileSize", () => {
  it("accepts a file under the limit", () => {
    expect(validateFileSize(file("image/png", 1024), 5)).toEqual({ valid: true });
  });

  it("accepts a file exactly at the limit", () => {
    expect(validateFileSize(file("image/png", 5 * 1024 * 1024), 5)).toEqual({
      valid: true,
    });
  });

  it("rejects a file over the limit with the documented message", () => {
    expect(validateFileSize(file("image/png", 5 * 1024 * 1024 + 1), 5)).toEqual({
      valid: false,
      message: "File size must be less than 5MB",
    });
  });

  it("accepts an empty file", () => {
    expect(validateFileSize(file("image/png", 0), 1)).toEqual({ valid: true });
  });
});
