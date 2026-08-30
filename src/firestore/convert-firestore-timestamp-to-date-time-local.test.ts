import { describe, expect, it } from "vitest";
import { convertFirestoreTimestampToDateTimeLocal } from "./index.js";

describe("convertFirestoreTimestampToDateTimeLocal", () => {
  it("produces the local-time YYYY-MM-DDTHH:mm value datetime-local expects", () => {
    const local = new Date(2026, 8, 23, 10, 30); // constructed in local time on purpose
    expect(convertFirestoreTimestampToDateTimeLocal(local)).toBe("2026-09-23T10:30");
  });
  it("returns an empty string for anything unparseable", () => {
    expect(convertFirestoreTimestampToDateTimeLocal(null)).toBe("");
    expect(convertFirestoreTimestampToDateTimeLocal({})).toBe("");
  });

  it("accepts millis and pads single-digit components", () => {
    const local = new Date(2026, 0, 5, 9, 5);
    expect(convertFirestoreTimestampToDateTimeLocal(local.getTime())).toBe(
      "2026-01-05T09:05",
    );
  });
});
