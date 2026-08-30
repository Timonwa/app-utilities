import { describe, expect, it } from "vitest";
import { getOgImageUrl } from "./index.js";

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

  it("carries title and subtitle as query params", () => {
    expect(
      getOgImageUrl({ siteUrl: "https://x.com", title: "Privacy", subtitle: "Data use" }),
    ).toBe("https://x.com/api/og?title=Privacy&subtitle=Data+use");
  });

  it("ignores a null cover image", () => {
    expect(
      getOgImageUrl({ siteUrl: "https://x.com", coverImage: null, title: "Hi" }),
    ).toBe("https://x.com/api/og?title=Hi");
  });

  it("URL-encodes reserved characters in the title", () => {
    expect(getOgImageUrl({ siteUrl: "https://x.com", title: "A&B=C" })).toBe(
      "https://x.com/api/og?title=A%26B%3DC",
    );
  });
});
