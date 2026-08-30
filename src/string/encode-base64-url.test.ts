import { describe, expect, it } from "vitest";
import { decodeBase64Url, encodeBase64Url } from "./index.js";

describe("encodeBase64Url", () => {
  it("round-trips with decodeBase64Url, unicode included", () => {
    expect(encodeBase64Url('{"a":1}')).toBe("eyJhIjoxfQ");
    expect(decodeBase64Url(encodeBase64Url("naïve 🎉"))).toBe("naïve 🎉");
    expect(encodeBase64Url("~~~")).not.toMatch(/[+/=]/);
  });

  it("drops base64 padding", () => {
    // btoa("a") is "YQ==" — the trailing "=" never reaches a URL.
    expect(encodeBase64Url("a")).toBe("YQ");
  });

  it("encodes empty input to an empty string", () => {
    expect(encodeBase64Url("")).toBe("");
  });
});
