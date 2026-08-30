import { describe, expect, it } from "vitest";
import { HOST, SAMPLE_UPLOAD_URL } from "./_test-helpers.js";
import { buildCloudinarySrcset } from "./index.js";

describe("buildCloudinarySrcset", () => {
  it("builds a srcset over the default ladder", () => {
    const srcset = buildCloudinarySrcset(SAMPLE_UPLOAD_URL);
    expect(srcset.split(", ")).toHaveLength(5);
    expect(srcset).toContain("480w");
    expect(srcset).toContain("1600w");
  });

  it("returns an empty srcset for a non-Cloudinary URL, so the attribute can be dropped", () => {
    expect(buildCloudinarySrcset("https://example.com/a.jpg")).toBe("");
  });

  it("honours custom widths, in the order given", () => {
    expect(buildCloudinarySrcset(SAMPLE_UPLOAD_URL, [320, 640])).toBe(
      `${HOST}/d/image/upload/w_320,c_limit,q_auto,f_auto,dpr_auto/v1/a.jpg 320w, ` +
        `${HOST}/d/image/upload/w_640,c_limit,q_auto,f_auto,dpr_auto/v1/a.jpg 640w`,
    );
  });

  it("every entry in the ladder is resized, not just labelled", () => {
    const srcset = buildCloudinarySrcset(SAMPLE_UPLOAD_URL);
    for (const entry of srcset.split(", ")) {
      const [url, descriptor] = entry.split(" ");
      expect(url).toContain(`w_${descriptor?.replace("w", "")},c_limit`);
    }
  });
});
