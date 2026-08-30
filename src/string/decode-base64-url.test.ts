import { describe, expect, it } from "vitest";
import { decodeBase64Url } from "./index.js";

describe("decodeBase64Url", () => {
  it("decodes unpadded base64url", () => {
    expect(decodeBase64Url("eyJhIjoxfQ")).toBe('{"a":1}');
  });

  // The original returned "{}" here, which reads downstream as a valid empty payload.
  it("returns null rather than something that parses", () => {
    expect(decodeBase64Url("!!!not base64!!!")).toBeNull();
  });

  it("accepts input that still carries its padding", () => {
    expect(decodeBase64Url("eyJhIjoxfQ==")).toBe('{"a":1}');
  });

  it("returns an empty string, not null, for an empty payload", () => {
    expect(decodeBase64Url("")).toBe("");
  });
});
