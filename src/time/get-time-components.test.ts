import { describe, expect, it } from "vitest";
import { getTimeComponents } from "./index.js";

describe("getTimeComponents", () => {
  it("returns the local hours, minutes, and seconds", () => {
    expect(getTimeComponents(new Date(2024, 0, 15, 15, 30, 45))).toEqual({
      hours: 15,
      minutes: 30,
      seconds: 45,
    });
  });

  it("returns zeros at local midnight", () => {
    expect(getTimeComponents(new Date(2024, 0, 15))).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});
