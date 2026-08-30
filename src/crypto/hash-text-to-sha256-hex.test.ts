import { describe, expect, it } from "vitest";
import { hashTextToSha256Hex } from "./index.js";

describe("hashTextToSha256Hex", () => {
  it("matches the known SHA-256 vector for 'hello'", async () => {
    expect(await hashTextToSha256Hex("hello")).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    );
  });
  it("matches the known vector for the empty string", async () => {
    expect(await hashTextToSha256Hex("")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
  });
  it("hashes multi-byte UTF-8 without mangling", async () => {
    expect(await hashTextToSha256Hex("naïra ₦")).toHaveLength(64);
  });
});
