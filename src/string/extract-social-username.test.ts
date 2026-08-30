import { describe, expect, it } from "vitest";
import { extractSocialUsername } from "./index.js";

describe("extractSocialUsername", () => {
  it("accepts a URL, an @handle, or a bare handle", () => {
    expect(extractSocialUsername("https://instagram.com/timonwa/")).toBe("timonwa");
    expect(extractSocialUsername("www.x.com/timonwa?ref=x")).toBe("timonwa");
    expect(extractSocialUsername("@timonwa")).toBe("timonwa");
    expect(extractSocialUsername("timonwa")).toBe("timonwa");
  });

  it("cuts everything after the handle segment", () => {
    expect(extractSocialUsername("https://x.com/timonwa/status/123")).toBe("timonwa");
    expect(extractSocialUsername("https://instagram.com/timonwa#reels")).toBe("timonwa");
  });

  it("handles platforms that put @ in the URL path", () => {
    expect(extractSocialUsername("https://tiktok.com/@timonwa")).toBe("timonwa");
    expect(extractSocialUsername("https://threads.net/@timonwa")).toBe("timonwa");
  });

  it("trims surrounding whitespace first", () => {
    expect(extractSocialUsername("  @timonwa  ")).toBe("timonwa");
  });

  it("skips LinkedIn's /in/ path prefix", () => {
    expect(extractSocialUsername("https://linkedin.com/in/timonwa")).toBe("timonwa");
  });
});
