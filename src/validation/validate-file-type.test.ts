import { describe, expect, it } from "vitest";
import { file } from "./_test-helpers.js";
import { validateFileType } from "./index.js";

describe("validateFileType", () => {
  it("accepts a listed MIME type", () => {
    expect(validateFileType(file("image/png"), ["image/png"])).toEqual({ valid: true });
  });

  it("rejects an unlisted type and names the allowed list", () => {
    expect(validateFileType(file("image/gif"), ["image/png", "image/jpeg"])).toEqual({
      valid: false,
      message: "Invalid file type: image/gif. Allowed types: image/png, image/jpeg",
    });
  });

  it("rejects everything when the allowed list is empty", () => {
    expect(validateFileType(file("image/png"), []).valid).toBe(false);
  });

  it("matches exactly, not by prefix", () => {
    expect(validateFileType(file("image/png"), ["image"]).valid).toBe(false);
  });
});
