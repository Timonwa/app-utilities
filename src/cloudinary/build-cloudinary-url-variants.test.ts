import { describe, expect, it } from "vitest";
import { HOST } from "./_test-helpers.js";
import { buildCloudinaryUrlVariants } from "./index.js";

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
