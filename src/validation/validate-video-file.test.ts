import { describe, expect, it } from "vitest";
import { file } from "./_test-helpers.js";
import { validateFileSize, validateVideoFile } from "./index.js";

describe("file validators", () => {
  it("size limits and video options", () => {
    expect(validateFileSize(file("image/png", 6 * 1024 * 1024), 5).valid).toBe(false);
    expect(validateVideoFile(file("video/mp4")).valid).toBe(true);
    expect(
      validateVideoFile(file("video/mp4", 60_000_000), { maxSizeBytes: 50_000_000 })
        .valid,
    ).toBe(false);
  });

  it("skips the size check when no limit is set", () => {
    expect(validateVideoFile(file("video/mp4", 900_000_000)).valid).toBe(true);
  });

  it("rejects the type before looking at the size", () => {
    const result = validateVideoFile(file("image/png", 1), { maxSizeBytes: 50 });
    expect(result.valid).toBe(false);
    expect(result.message).not.toContain("size");
  });

  it("names both sizes in the failure message", () => {
    const result = validateVideoFile(file("video/mp4", 60_000_000), {
      maxSizeBytes: 50_000_000,
    });
    expect(result.message).toContain("57.2MB");
    expect(result.message).toContain("47.7MB");
  });
});
