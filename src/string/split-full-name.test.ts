import { describe, expect, it } from "vitest";
import { splitFullName } from "./index.js";

describe("splitFullName", () => {
  it("takes the first token as the first name and the rest as the last", () => {
    expect(splitFullName("Ada Lovelace")).toEqual({
      firstName: "Ada",
      lastName: "Lovelace",
    });
    expect(splitFullName("Ada King Lovelace")).toEqual({
      firstName: "Ada",
      lastName: "King Lovelace",
    });
  });

  it("handles one name and empty input", () => {
    expect(splitFullName("Ada")).toEqual({ firstName: "Ada", lastName: "" });
    expect(splitFullName("  ")).toEqual({ firstName: "", lastName: "" });
  });

  it("collapses extra whitespace between tokens", () => {
    expect(splitFullName("  Ada   Lovelace  ")).toEqual({
      firstName: "Ada",
      lastName: "Lovelace",
    });
  });

  it("keeps hyphenated surnames whole", () => {
    expect(splitFullName("Ada Lovelace-King")).toEqual({
      firstName: "Ada",
      lastName: "Lovelace-King",
    });
  });
});
