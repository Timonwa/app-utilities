import { describe, expect, it } from "vitest";
import { humanizeConstant } from "./index.js";

describe("humanizeConstant", () => {
  it("sentence-cases, so it reads inside a label", () => {
    expect(humanizeConstant("arts_and_culture")).toBe("Arts and culture");
  });

  it("lowers the rest of an UPPER_SNAKE constant", () => {
    expect(humanizeConstant("ARTS_AND_CULTURE")).toBe("Arts and culture");
    expect(humanizeConstant("MUSIC")).toBe("Music");
  });

  it("returns empty input untouched", () => {
    expect(humanizeConstant("")).toBe("");
  });
});
