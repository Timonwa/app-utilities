import { describe, expect, it } from "vitest";
import { file } from "./_test-helpers.js";
import { validateImageFile } from "./index.js";

describe("file validators", () => {
  it("type policies are parameters with sensible defaults", () => {
    expect(validateImageFile(file("image/png")).valid).toBe(true);
    expect(validateImageFile(file("image/bmp")).valid).toBe(false);
    expect(validateImageFile(file("image/bmp"), ["image/bmp"]).valid).toBe(true);
  });

  it("accepts every default web-safe image type", () => {
    for (const type of ["image/jpeg", "image/png", "image/webp", "image/gif"]) {
      expect(validateImageFile(file(type)).valid).toBe(true);
    }
  });

  it("rejects non-image types with a message", () => {
    const result = validateImageFile(file("application/pdf"));
    expect(result.valid).toBe(false);
    expect(result.message).toBeTruthy();
  });
});
