import { describe, expect, it } from "vitest";
import { createSlugFromNameAndId, extractNameFromSlug } from "./index.js";

describe("extractNameFromSlug", () => {
  it("returns everything before the last hyphen, with hyphens as spaces", () => {
    expect(extractNameFromSlug("summer-fete-a1b2")).toBe("summer fete");
  });

  it("round-trips the name part of createSlugFromNameAndId", () => {
    expect(extractNameFromSlug(createSlugFromNameAndId("Summer Fete", "a1b2"))).toBe(
      "summer fete",
    );
  });

  it("URL-decodes the slug before splitting", () => {
    expect(extractNameFromSlug("caf%C3%A9%20night-x9")).toBe("café night");
  });

  it("returns an empty string when there is no name part", () => {
    expect(extractNameFromSlug("abc123")).toBe("");
    expect(extractNameFromSlug("")).toBe("");
  });
});
