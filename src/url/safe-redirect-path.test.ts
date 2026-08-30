import { describe, expect, it } from "vitest";
import { safeRedirectPath } from "./index.js";

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

  it("rejects percent-encoded backslash and embedded scheme variants", () => {
    expect(safeRedirectPath("/%5Cevil.com", "/fallback")).toBe("/fallback");
    expect(safeRedirectPath("/a%3A/b", "/fallback")).toBe("/fallback");
  });

  it("rejects malformed percent-encoding rather than throwing", () => {
    expect(safeRedirectPath("/%zz", "/fallback")).toBe("/fallback");
  });

  it("keeps hashes and nested paths that stay same-origin", () => {
    expect(safeRedirectPath("/a/b/c#section", "/")).toBe("/a/b/c#section");
  });
});
