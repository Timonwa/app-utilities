import { describe, expect, it } from "vitest";
import { generateNumericCode, generateRandomString } from "./index.js";

describe("generators", () => {
  it("random string and numeric code respect length and alphabet", () => {
    expect(generateRandomString(12)).toMatch(/^[A-Za-z0-9]{12}$/);
    expect(generateNumericCode(6)).toMatch(/^\d{6}$/);
  });

  it("defaults to 8 characters", () => {
    expect(generateRandomString()).toMatch(/^[A-Za-z0-9]{8}$/);
  });

  it("produces distinct values across calls", () => {
    const seen = new Set(Array.from({ length: 20 }, () => generateRandomString(12)));
    expect(seen.size).toBe(20);
  });
});
