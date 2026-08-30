import { describe, expect, it } from "vitest";
import { convertStringToCamelCase } from "./index.js";

describe("convertStringToCamelCase", () => {
  it("keeps word boundaries in PascalCase input", () => {
    expect(convertStringToCamelCase("hello world")).toBe("helloWorld");
    // A single lowercase-then-replace pass returns "helloworld" here.
    expect(convertStringToCamelCase("HelloWorld")).toBe("helloWorld");
  });

  it("accepts kebab, snake, and dotted input", () => {
    expect(convertStringToCamelCase("hello-world")).toBe("helloWorld");
    expect(convertStringToCamelCase("hello_world")).toBe("helloWorld");
    expect(convertStringToCamelCase("user.first_name")).toBe("userFirstName");
  });

  it("lower-cases acronym runs word by word", () => {
    expect(convertStringToCamelCase("XMLHttpRequest")).toBe("xmlHttpRequest");
  });

  it("returns input with no words unchanged", () => {
    expect(convertStringToCamelCase("")).toBe("");
  });
});
