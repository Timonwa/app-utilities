import { describe, expect, it } from "vitest";
import { isValidTimeString } from "./index.js";

describe("parsing and ranges", () => {
  it("rejects impossible clock times", () => {
    expect(isValidTimeString("25:00")).toBe(false);
    expect(isValidTimeString("14:30")).toBe(true);
    expect(isValidTimeString("9:05")).toBe(true);
  });

  it("accepts an optional seconds segment", () => {
    expect(isValidTimeString("14:30:45")).toBe(true);
    expect(isValidTimeString("14:30:60")).toBe(false);
  });

  it("rejects out-of-range minutes and empty input", () => {
    expect(isValidTimeString("14:60")).toBe(false);
    expect(isValidTimeString("")).toBe(false);
  });
});
