import { describe, expect, it } from "vitest";
import { convertStringToSnakeCase } from "./index.js";

describe("convertStringToSnakeCase", () => {
  it("converts camelCase and PascalCase", () => {
    expect(convertStringToSnakeCase("HelloWorld")).toBe("hello_world");
    expect(convertStringToSnakeCase("helloWorld")).toBe("hello_world");
  });

  it("converts spaced, hyphenated, and dotted words", () => {
    expect(convertStringToSnakeCase("hello world")).toBe("hello_world");
    expect(convertStringToSnakeCase("hello-world")).toBe("hello_world");
    expect(convertStringToSnakeCase("user.first_name")).toBe("user_first_name");
  });

  it("keeps digits attached to their word", () => {
    expect(convertStringToSnakeCase("v2 Rollout")).toBe("v2_rollout");
    expect(convertStringToSnakeCase("api2Endpoint")).toBe("api2_endpoint");
  });

  it("splits consecutive-capital runs like XMLHttp", () => {
    expect(convertStringToSnakeCase("XMLHttpRequest")).toBe("xml_http_request");
  });

  it("returns strings with no words unchanged", () => {
    expect(convertStringToSnakeCase("")).toBe("");
    expect(convertStringToSnakeCase("---")).toBe("---");
  });
});
