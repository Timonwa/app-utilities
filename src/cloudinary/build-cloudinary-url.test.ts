import { describe, expect, it } from "vitest";
import { HOST } from "./_test-helpers.js";
import { buildCloudinaryUrl } from "./index.js";

describe("buildCloudinaryUrl", () => {
  it("builds with and without a transform", () => {
    expect(
      buildCloudinaryUrl({ cloudName: "demo", publicId: "a/b", transform: "w_300" }),
    ).toBe(`${HOST}/demo/image/upload/w_300/a/b`);
    expect(buildCloudinaryUrl({ cloudName: "demo", publicId: "a/b" })).toBe(
      `${HOST}/demo/image/upload/a/b`,
    );
  });

  it("honours the asset type", () => {
    expect(
      buildCloudinaryUrl({ cloudName: "demo", publicId: "a", assetType: "video" }),
    ).toBe(`${HOST}/demo/video/upload/a`);
  });
});
