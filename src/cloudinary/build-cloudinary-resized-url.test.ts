import { describe, expect, it } from "vitest";
import { HOST, SAMPLE_UPLOAD_URL } from "./_test-helpers.js";
import { buildCloudinaryResizedUrl } from "./index.js";

describe("buildCloudinaryResizedUrl", () => {
  it("builds a width-limited URL that never upscales", () => {
    expect(buildCloudinaryResizedUrl(SAMPLE_UPLOAD_URL, 768)).toContain("w_768,c_limit");
  });

  it("places the full resize chain ahead of the version segment", () => {
    expect(buildCloudinaryResizedUrl(SAMPLE_UPLOAD_URL, 480)).toBe(
      `${HOST}/d/image/upload/w_480,c_limit,q_auto,f_auto,dpr_auto/v1/a.jpg`,
    );
  });

  it("does not swallow a folder in the asset path", () => {
    expect(
      buildCloudinaryResizedUrl(`${HOST}/d/image/upload/events/e1/p2.jpg`, 768),
    ).toBe(
      `${HOST}/d/image/upload/w_768,c_limit,q_auto,f_auto,dpr_auto/events/e1/p2.jpg`,
    );
  });

  it("leaves a non-Cloudinary URL alone", () => {
    expect(buildCloudinaryResizedUrl("https://example.com/a.jpg", 768)).toBe(
      "https://example.com/a.jpg",
    );
  });
});
