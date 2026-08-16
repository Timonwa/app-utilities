import { describe, expect, it } from "vitest";
import { getOgImageUrl, safeRedirectPath } from "./index.js";

describe("safeRedirectPath", () => {
  it("accepts same-origin paths", () => {
    expect(safeRedirectPath("/account", "/")).toBe("/account");
    expect(safeRedirectPath("/a/b?x=1", "/")).toBe("/a/b?x=1");
  });

  it("rejects every open-redirect shape", () => {
    for (const evil of [
      "//evil.com",
      "/\\evil.com",
      "https://evil.com",
      "javascript:alert(1)",
      "/%2F%2Fevil.com",
      "%2Fevil",
      "",
      undefined,
    ]) {
      expect(safeRedirectPath(evil as string, "/fallback")).toBe("/fallback");
    }
  });
});

describe("getOgImageUrl", () => {
  it("prefers a cover image, otherwise builds the endpoint URL", () => {
    expect(
      getOgImageUrl({ siteUrl: "https://x.com", coverImage: "https://cdn/x.jpg" }),
    ).toBe("https://cdn/x.jpg");
    expect(getOgImageUrl({ siteUrl: "https://x.com", title: "Hi there" })).toBe(
      "https://x.com/api/og?title=Hi+there",
    );
    expect(getOgImageUrl({ siteUrl: "https://x.com" })).toBe("https://x.com/api/og");
  });

  it("the endpoint path is a parameter", () => {
    expect(getOgImageUrl({ siteUrl: "https://x.com", path: "/og" })).toBe(
      "https://x.com/og",
    );
  });
});
