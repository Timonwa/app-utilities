import { describe, expect, it } from "vitest";
import {
  hasValidationErrors,
  validateEmail,
  validateFileSize,
  validateFiles,
  validateFileType,
  validateImageFile,
  validateNumberRange,
  validatePassword,
  validateRequired,
  validateStringLength,
  validateUrl,
  validateVideoFile,
} from "./index.js";

const file = (type: string, size = 1000) =>
  ({ type, size, name: "f" }) as unknown as File;

describe("one result shape everywhere", () => {
  it("valid results carry no message; invalid ones do", () => {
    expect(validateEmail("a@b.co")).toEqual({ valid: true });
    expect(validateEmail("nope").valid).toBe(false);
    expect(validateEmail("nope").message).toBe("Invalid email format");
  });
});

describe("form validators", () => {
  it("required across shapes", () => {
    expect(validateRequired("x", "Name").valid).toBe(true);
    expect(validateRequired("  ", "Name").message).toBe("Name is required");
    expect(validateRequired([], "Tags").valid).toBe(false);
    expect(validateRequired(0, "Count").valid).toBe(true);
  });

  it("lengths and ranges name the field", () => {
    expect(validateStringLength("hi", 3, 10, "Bio").message).toContain("Bio");
    expect(validateNumberRange(11, 1, 10).message).toBe("Value must be no more than 10");
  });

  it("password collects every failed rule", () => {
    const weak = validatePassword("abc");
    expect(weak.valid).toBe(false);
    expect(weak.messages.length).toBeGreaterThanOrEqual(2);
    expect(weak.message).toBe(weak.messages[0]);
    expect(validatePassword("Password123").valid).toBe(true);
  });

  it("urls", () => {
    expect(validateUrl("https://example.com").valid).toBe(true);
    expect(validateUrl("not a url").valid).toBe(false);
  });
});

describe("file validators", () => {
  it("type policies are parameters with sensible defaults", () => {
    expect(validateImageFile(file("image/png")).valid).toBe(true);
    expect(validateImageFile(file("image/bmp")).valid).toBe(false);
    expect(validateImageFile(file("image/bmp"), ["image/bmp"]).valid).toBe(true);
  });

  it("size limits and video options", () => {
    expect(validateFileSize(file("image/png", 6 * 1024 * 1024), 5).valid).toBe(false);
    expect(validateVideoFile(file("video/mp4")).valid).toBe(true);
    expect(
      validateVideoFile(file("video/mp4", 60_000_000), { maxSizeBytes: 50_000_000 })
        .valid,
    ).toBe(false);
  });

  it("batch validation aggregates", () => {
    const results = validateFiles([file("image/png"), file("text/plain")], (f) =>
      validateFileType(f, ["image/png"]),
    );
    expect(hasValidationErrors(results)).toBe(true);
    expect(results[0]?.valid).toBe(true);
  });
});
