import { describe, expect, it } from "vitest";
import {
  applyCloudinaryTransform,
  buildCloudinaryBlurUrl,
  buildCloudinaryPublicId,
  buildCloudinaryResizedUrl,
  buildCloudinarySrcset,
  buildCloudinaryUrl,
  buildCloudinaryUrlVariants,
  extractPublicIdFromCloudinaryUrl,
  isCloudinaryUrl,
} from "./index.js";

const HOST = "https://res.cloudinary.com";

describe("isCloudinaryUrl", () => {
  it("recognises the delivery host only", () => {
    expect(isCloudinaryUrl(`${HOST}/demo/image/upload/a.jpg`)).toBe(true);
    expect(isCloudinaryUrl("https://example.com/a.jpg")).toBe(false);
    expect(isCloudinaryUrl(undefined as unknown as string)).toBe(false);
  });
});

describe("buildCloudinaryPublicId", () => {
  it("joins segments and drops empties", () => {
    expect(buildCloudinaryPublicId(["events", "ev_1", "ph_2"])).toBe("events/ev_1/ph_2");
    expect(buildCloudinaryPublicId(["events", "", "ph_2"])).toBe("events/ph_2");
  });

  it("replaces characters that would break the URL", () => {
    expect(buildCloudinaryPublicId(["users", "a b?c"])).toBe("users/a-b-c");
    expect(buildCloudinaryPublicId(["a#b", "c&d"])).toBe("a-b/c-d");
  });

  it("accepts numbers", () => {
    expect(buildCloudinaryPublicId(["events", 42])).toBe("events/42");
  });
});

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

describe("buildCloudinaryUrlVariants", () => {
  it("returns one URL per named variant, keyed by the map passed in", () => {
    const urls = buildCloudinaryUrlVariants({
      cloudName: "demo",
      publicId: "events/e1/p2",
      variants: {
        thumbnail: "c_limit,w_300,q_auto",
        preview: "t_watermark_v1,q_auto",
      },
    });

    expect(urls.thumbnail).toBe(
      `${HOST}/demo/image/upload/c_limit,w_300,q_auto/events/e1/p2`,
    );
    expect(urls.preview).toBe(
      `${HOST}/demo/image/upload/t_watermark_v1,q_auto/events/e1/p2`,
    );
    expect(Object.keys(urls)).toEqual(["thumbnail", "preview"]);
  });
});

describe("applyCloudinaryTransform", () => {
  it("inserts ahead of a version segment", () => {
    expect(applyCloudinaryTransform(`${HOST}/d/image/upload/v1234/a.jpg`, "w_40")).toBe(
      `${HOST}/d/image/upload/w_40/v1234/a.jpg`,
    );
  });

  it("chains onto existing transforms", () => {
    expect(
      applyCloudinaryTransform(`${HOST}/d/image/upload/c_fill,h_20/a.jpg`, "w_40"),
    ).toBe(`${HOST}/d/image/upload/c_fill,h_20,w_40/a.jpg`);
  });

  // The bug in the original: a folder segment is not a version segment, so it was
  // treated as a transform chain and comma-joined into one, producing a 404.
  it("does not mistake a folder for a transform chain", () => {
    expect(applyCloudinaryTransform(`${HOST}/d/image/upload/folder/a.jpg`, "w_40")).toBe(
      `${HOST}/d/image/upload/w_40/folder/a.jpg`,
    );
  });

  it("does not mistake a bare filename for a transform chain", () => {
    expect(applyCloudinaryTransform(`${HOST}/d/image/upload/sample.jpg`, "w_40")).toBe(
      `${HOST}/d/image/upload/w_40/sample.jpg`,
    );
  });

  it("leaves a non-Cloudinary URL alone", () => {
    expect(applyCloudinaryTransform("https://example.com/a.jpg", "w_40")).toBe(
      "https://example.com/a.jpg",
    );
  });
});

describe("responsive helpers", () => {
  const url = `${HOST}/d/image/upload/v1/a.jpg`;

  it("builds a blur placeholder", () => {
    expect(buildCloudinaryBlurUrl(url)).toContain("e_blur:1000");
  });

  it("builds a width-limited URL that never upscales", () => {
    expect(buildCloudinaryResizedUrl(url, 768)).toContain("w_768,c_limit");
  });

  it("builds a srcset over the default ladder", () => {
    const srcset = buildCloudinarySrcset(url);
    expect(srcset.split(", ")).toHaveLength(5);
    expect(srcset).toContain("480w");
    expect(srcset).toContain("1600w");
  });

  it("returns an empty srcset for a non-Cloudinary URL, so the attribute can be dropped", () => {
    expect(buildCloudinarySrcset("https://example.com/a.jpg")).toBe("");
  });
});

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
