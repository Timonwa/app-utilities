import { describe, expect, it } from "vitest";
import { stripHtmlTagsFromString } from "./index.js";

describe("stripHtmlTagsFromString", () => {
  it("produces plain text", () => {
    expect(stripHtmlTagsFromString("<p>Hello</p>")).toBe("Hello");
  });

  it("strips tags with attributes and keeps the text between them", () => {
    expect(stripHtmlTagsFromString('<a href="/x">link</a>')).toBe("link");
    expect(stripHtmlTagsFromString("a <b>b</b> c")).toBe("a b c");
  });

  it("trims the leftover text", () => {
    expect(stripHtmlTagsFromString("  <b>Hi</b>  ")).toBe("Hi");
  });

  it("passes tag-free text through and empties empty input", () => {
    expect(stripHtmlTagsFromString("no tags here")).toBe("no tags here");
    expect(stripHtmlTagsFromString("")).toBe("");
  });
});
