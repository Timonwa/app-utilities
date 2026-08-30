import { describe, expect, it } from "vitest";
import {
  convertStringToCamelCase,
  convertStringToKebabCase,
  convertStringToSnakeCase,
  convertStringToTitleCase,
  convertStringToUpperSnakeCase,
} from "./index.js";

// The reason case conversion is ours and not es-toolkit's: es-toolkit treats a digit
// as a word boundary, which mangles version-numbered slugs and flag names.
describe("case conversion keeps digits attached to their word", () => {
  it("does not split v2 into v-2", () => {
    expect(convertStringToKebabCase("v2 rollout")).toBe("v2-rollout");
    expect(convertStringToSnakeCase("v2 rollout")).toBe("v2_rollout");
    expect(convertStringToUpperSnakeCase("v2 rollout")).toBe("V2_ROLLOUT");
    expect(convertStringToTitleCase("v2 rollout")).toBe("V2 Rollout");
    expect(convertStringToCamelCase("v2 rollout")).toBe("v2Rollout");
  });

  it("still splits camelCase humps and acronyms", () => {
    expect(convertStringToKebabCase("api2Key")).toBe("api2-key");
    expect(convertStringToKebabCase("XMLHttpRequest")).toBe("xml-http-request");
  });
});

describe("convertStringToKebabCase", () => {
  it("accepts snake and dotted input", () => {
    expect(convertStringToKebabCase("user.first_name")).toBe("user-first-name");
  });

  it("returns input with no words unchanged", () => {
    expect(convertStringToKebabCase("")).toBe("");
  });
});
