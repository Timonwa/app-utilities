import { describe, expect, it } from "vitest";
import { generateTransactionRef } from "./index.js";

describe("generators", () => {
  it("transaction ref combines the uid tail with a random suffix", () => {
    expect(generateTransactionRef("user12345678")).toMatch(/^12345678-[A-Za-z0-9]{8}$/);
  });

  it("keeps a short uid whole", () => {
    expect(generateTransactionRef("abc")).toMatch(/^abc-[A-Za-z0-9]{8}$/);
  });

  it("differs between calls for the same uid", () => {
    expect(generateTransactionRef("user12345678")).not.toBe(
      generateTransactionRef("user12345678"),
    );
  });
});
