import { describe, expect, it } from "vitest";
import { convertStringToTitleCase } from "./index.js";

describe("convertStringToTitleCase", () => {
  it("splits on camelCase humps as well as spaces", () => {
    expect(convertStringToTitleCase("hello world")).toBe("Hello World");
    expect(convertStringToTitleCase("helloWorld")).toBe("Hello World");
  });

  it("splits on hyphens and underscores too", () => {
    expect(convertStringToTitleCase("hello-world_foo")).toBe("Hello World Foo");
  });

  it("lowers the rest of shouty input", () => {
    expect(convertStringToTitleCase("HELLO WORLD")).toBe("Hello World");
  });
});

describe("convertStringToTitleCase covers dotted identifiers", () => {
  // Replaces a separate formatDelimitedToTitleCase that split on "." too.
  it("splits on dots as well", () => {
    expect(convertStringToTitleCase("user.first_name")).toBe("User First Name");
  });
});
