import { describe, expect, it } from "vitest";
import { HOST } from "./_test-helpers.js";
import { applyCloudinaryTransform } from "./index.js";

describe("applyCloudinaryTransform", () => {
  it("inserts ahead of a version segment", () => {
    expect(applyCloudinaryTransform(`${HOST}/d/image/upload/v1234/a.jpg`, "w_40")).toBe(
      `${HOST}/d/image/upload/w_40/v1234/a.jpg`,
    );
  });

  it("chains onto existing transforms", () => {
    expect(
      applyCloudinaryTransform(`${HOST}/d/image/upload/c_fill,h_20/a.jpg`, "w_40"),
    ).toBe(`${HOST}/d/image/upload/c_fill,h_20,w_40/a.jpg`);
  });

  // The bug in the original: a folder segment is not a version segment, so it was
  // treated as a transform chain and comma-joined into one, producing a 404.
  it("does not mistake a folder for a transform chain", () => {
    expect(applyCloudinaryTransform(`${HOST}/d/image/upload/folder/a.jpg`, "w_40")).toBe(
      `${HOST}/d/image/upload/w_40/folder/a.jpg`,
    );
  });

  it("does not mistake a bare filename for a transform chain", () => {
    expect(applyCloudinaryTransform(`${HOST}/d/image/upload/sample.jpg`, "w_40")).toBe(
      `${HOST}/d/image/upload/w_40/sample.jpg`,
    );
  });

  it("leaves a non-Cloudinary URL alone", () => {
    expect(applyCloudinaryTransform("https://example.com/a.jpg", "w_40")).toBe(
      "https://example.com/a.jpg",
    );
  });
});
