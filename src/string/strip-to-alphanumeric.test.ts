import { describe, expect, it } from "vitest";
import { stripToAlphanumeric } from "./index.js";

describe("stripToAlphanumeric", () => {
  it("collapses punctuation and case so variants compare equal", () => {
    expect(stripToAlphanumeric("O'Brien-Smith")).toBe("obriensmith");
    expect(stripToAlphanumeric("O Brien Smith")).toBe("obriensmith");
  });

  it("keeps digits and drops non-ASCII letters", () => {
    expect(stripToAlphanumeric("Room 42!")).toBe("room42");
    // Lossy by design — accents are dropped, not transliterated.
    expect(stripToAlphanumeric("café")).toBe("caf");
  });

  it("tolerates null and undefined", () => {
    expect(stripToAlphanumeric(null as unknown as string)).toBe("");
    expect(stripToAlphanumeric(undefined as unknown as string)).toBe("");
  });
});
