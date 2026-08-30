import { describe, expect, it } from "vitest";
import { convertNumberToOrdinal } from "./index.js";

describe("ordinals", () => {
  it("handles the teens, which naive %10 gets wrong", () => {
    expect(convertNumberToOrdinal(1)).toBe("1st");
    expect(convertNumberToOrdinal(2)).toBe("2nd");
    expect(convertNumberToOrdinal(11)).toBe("11th");
    expect(convertNumberToOrdinal(13)).toBe("13th");
    expect(convertNumberToOrdinal(22)).toBe("22nd");
    expect(convertNumberToOrdinal(101)).toBe("101st");
  });

  it("keeps the teens as th through the hundreds", () => {
    expect(convertNumberToOrdinal(111)).toBe("111th");
    expect(convertNumberToOrdinal(112)).toBe("112th");
    expect(convertNumberToOrdinal(113)).toBe("113th");
  });

  it("covers rd and zero", () => {
    expect(convertNumberToOrdinal(3)).toBe("3rd");
    expect(convertNumberToOrdinal(23)).toBe("23rd");
    expect(convertNumberToOrdinal(0)).toBe("0th");
  });
});
