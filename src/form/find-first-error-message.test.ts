import { describe, expect, it } from "vitest";
import { findFirstErrorMessage } from "./index.js";

describe("findFirstErrorMessage", () => {
  it("finds the first message at any depth", () => {
    expect(findFirstErrorMessage({ name: { message: "Required" } })).toBe("Required");
    expect(
      findFirstErrorMessage({ venue: { name: { message: "Venue name is required" } } }),
    ).toBe("Venue name is required");
  });

  it("skips empty messages and returns undefined when there are none", () => {
    expect(findFirstErrorMessage({ a: { message: "" }, b: { message: "Real" } })).toBe(
      "Real",
    );
    expect(findFirstErrorMessage({})).toBeUndefined();
    expect(findFirstErrorMessage(null)).toBeUndefined();
  });

  it("prefers a parent message over descending further", () => {
    expect(
      findFirstErrorMessage({ message: "Top-level", nested: { message: "Deeper" } }),
    ).toBe("Top-level");
  });

  it("walks arrays of field errors", () => {
    expect(
      findFirstErrorMessage({ tickets: [{}, { price: { message: "Too low" } }] }),
    ).toBe("Too low");
  });

  it("ignores non-string message values", () => {
    expect(findFirstErrorMessage({ a: { message: 42 } })).toBeUndefined();
  });
});
