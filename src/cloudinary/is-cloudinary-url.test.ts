import { describe, expect, it } from "vitest";
import { HOST } from "./_test-helpers.js";
import { isCloudinaryUrl } from "./index.js";

describe("isCloudinaryUrl", () => {
  it("recognises the delivery host only", () => {
    expect(isCloudinaryUrl(`${HOST}/demo/image/upload/a.jpg`)).toBe(true);
    expect(isCloudinaryUrl("https://example.com/a.jpg")).toBe(false);
    expect(isCloudinaryUrl(undefined as unknown as string)).toBe(false);
  });
});
