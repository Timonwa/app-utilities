import { describe, expect, it } from "vitest";
import {
  createSlugFromNameAndId,
  extractIdFromSlug,
  extractNameFromSlug,
} from "./index.js";

describe("slug round trip", () => {
  it("strips accents and punctuation without leaving stray hyphens", () => {
    expect(createSlugFromNameAndId(" Summer  Fête! ", "a1b2")).toBe("summer-fete-a1b2");
  });

  it("recovers the id and the name", () => {
    const slug = createSlugFromNameAndId("Summer Fete", "a1b2");
    expect(extractIdFromSlug(slug)).toBe("a1b2");
    expect(extractNameFromSlug(slug)).toBe("summer fete");
  });

  it("falls back to the bare id when the name has nothing usable", () => {
    expect(createSlugFromNameAndId("!!!", "a1b2")).toBe("a1b2");
  });
});
