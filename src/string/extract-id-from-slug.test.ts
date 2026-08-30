import { describe, expect, it } from "vitest";
import { createSlugFromNameAndId, extractIdFromSlug } from "./index.js";

describe("extractIdFromSlug", () => {
  it("returns the segment after the last hyphen", () => {
    expect(extractIdFromSlug("summer-fete-a1b2")).toBe("a1b2");
  });

  it("round-trips ids created by createSlugFromNameAndId", () => {
    expect(extractIdFromSlug(createSlugFromNameAndId(" Summer  Fête! ", "a1b2"))).toBe(
      "a1b2",
    );
    expect(extractIdFromSlug(createSlugFromNameAndId("", "solo"))).toBe("solo");
  });

  it("URL-decodes the slug before splitting", () => {
    expect(extractIdFromSlug("caf%C3%A9-night-x9")).toBe("x9");
  });

  it("returns a hyphen-free slug whole", () => {
    expect(extractIdFromSlug("abc123")).toBe("abc123");
  });

  it("returns an empty string for an empty slug or trailing hyphen", () => {
    expect(extractIdFromSlug("")).toBe("");
    expect(extractIdFromSlug("name-")).toBe("");
  });
});
