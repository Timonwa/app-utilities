import { describe, expect, it } from "vitest";
import { capitalizeString } from "./index.js";

describe("capitalizeString", () => {
  it("leaves the remainder alone", () => {
    expect(capitalizeString("hello")).toBe("Hello");
    // The reason this isn't es-toolkit's `capitalize`, which would give "Mcdonald".
    expect(capitalizeString("McDonald")).toBe("McDonald");
  });

  it("handles single characters and accented first letters", () => {
    expect(capitalizeString("a")).toBe("A");
    expect(capitalizeString("étoile")).toBe("Étoile");
  });

  it("returns empty input untouched", () => {
    expect(capitalizeString("")).toBe("");
  });
});
