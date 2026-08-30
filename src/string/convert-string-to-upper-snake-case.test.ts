import { describe, expect, it } from "vitest";
import { convertStringToUpperSnakeCase } from "./index.js";

describe("convertStringToUpperSnakeCase", () => {
  it("drops punctuation rather than encoding it", () => {
    expect(convertStringToUpperSnakeCase("my new flag")).toBe("MY_NEW_FLAG");
    expect(convertStringToUpperSnakeCase("v2 rollout")).toBe("V2_ROLLOUT");
  });

  it("accepts camelCase and kebab-case input", () => {
    expect(convertStringToUpperSnakeCase("myNewFlag")).toBe("MY_NEW_FLAG");
    expect(convertStringToUpperSnakeCase("my-new-flag")).toBe("MY_NEW_FLAG");
  });

  it("strips punctuation that survives word-splitting", () => {
    expect(convertStringToUpperSnakeCase("my new flag!")).toBe("MY_NEW_FLAG");
  });

  it("returns input with no words unchanged", () => {
    expect(convertStringToUpperSnakeCase("")).toBe("");
  });
});
