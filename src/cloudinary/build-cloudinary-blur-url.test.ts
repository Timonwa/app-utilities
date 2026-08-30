import { describe, expect, it } from "vitest";
import { HOST, SAMPLE_UPLOAD_URL } from "./_test-helpers.js";
import { buildCloudinaryBlurUrl } from "./index.js";

describe("buildCloudinaryBlurUrl", () => {
  it("builds a blur placeholder", () => {
    expect(buildCloudinaryBlurUrl(SAMPLE_UPLOAD_URL)).toContain("e_blur:1000");
  });

  it("inserts the whole placeholder chain ahead of the version segment", () => {
    expect(buildCloudinaryBlurUrl(SAMPLE_UPLOAD_URL)).toBe(
      `${HOST}/d/image/upload/w_40,e_blur:1000,q_auto:low,f_auto/v1/a.jpg`,
    );
  });

  it("chains onto a URL that already carries a transform", () => {
    expect(buildCloudinaryBlurUrl(`${HOST}/d/image/upload/c_fill,h_200/a.jpg`)).toBe(
      `${HOST}/d/image/upload/c_fill,h_200,w_40,e_blur:1000,q_auto:low,f_auto/a.jpg`,
    );
  });

  it("leaves a non-Cloudinary URL alone", () => {
    expect(buildCloudinaryBlurUrl("https://example.com/a.jpg")).toBe(
      "https://example.com/a.jpg",
    );
  });
});
