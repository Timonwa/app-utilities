import { describe, expect, it } from "vitest";
import { HOST } from "./_test-helpers.js";
import { buildCloudinaryUrl, extractPublicIdFromCloudinaryUrl } from "./index.js";

describe("extractPublicIdFromCloudinaryUrl", () => {
  it("inverts buildCloudinaryUrl through transforms, versions, and extensions", () => {
    expect(
      extractPublicIdFromCloudinaryUrl(
        `${HOST}/demo/image/upload/w_300,q_auto/v1712345/events/e1/p2.jpg`,
      ),
    ).toBe("events/e1/p2");
    const built = buildCloudinaryUrl({ cloudName: "demo", publicId: "a/b" });
    expect(extractPublicIdFromCloudinaryUrl(built)).toBe("a/b");
  });

  it("does not eat a folder that merely looks odd", () => {
    expect(extractPublicIdFromCloudinaryUrl(`${HOST}/d/image/upload/folder/a.png`)).toBe(
      "folder/a",
    );
    expect(extractPublicIdFromCloudinaryUrl("https://example.com/a.jpg")).toBeUndefined();
  });
});
