import { describe, expect, it } from "vitest";
import { parseTimeString } from "./index.js";

describe("parseTimeString", () => {
  it("parses HH:MM with seconds defaulting to zero", () => {
    expect(parseTimeString("14:30")).toEqual({ hours: 14, minutes: 30, seconds: 0 });
  });

  it("parses HH:MM:SS", () => {
    expect(parseTimeString("14:30:15")).toEqual({
      hours: 14,
      minutes: 30,
      seconds: 15,
    });
  });

  it("defaults missing fields to zero", () => {
    expect(parseTimeString("7")).toEqual({ hours: 7, minutes: 0, seconds: 0 });
    expect(parseTimeString("")).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it("parses zero-padded midnight", () => {
    expect(parseTimeString("00:00:00")).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });
});
