import { describe, expect, it } from "vitest";
import {
  formatDateToRelative,
  formatDateToRelativeShort,
  formatMillisToRelative,
} from "./index.js";

describe("relative time via Intl", () => {
  it("formats past and future, long and short", () => {
    expect(formatDateToRelative(new Date(Date.now() - 7_200_000), "en")).toBe(
      "2 hours ago",
    );
    expect(formatDateToRelative(new Date(Date.now() + 7_200_000), "en")).toBe(
      "in 2 hours",
    );
    expect(formatDateToRelativeShort(new Date(Date.now() - 300_000))).toBe("5m ago");
    expect(formatDateToRelativeShort(new Date(Date.now() + 259_200_000))).toBe("in 3d");
    expect(formatMillisToRelative(Date.now() - 7_200_000, "en")).toBe("2 hours ago");
  });

  it("uses named phrases where numeric: auto has them", () => {
    expect(formatDateToRelative(new Date(Date.now() - 86_400_000), "en")).toBe(
      "yesterday",
    );
    expect(formatDateToRelative(new Date(), "en")).toBe("now");
  });

  it("climbs the unit ladder to weeks", () => {
    expect(formatDateToRelative(new Date(Date.now() - 14 * 86_400_000), "en")).toBe(
      "2 weeks ago",
    );
  });

  it("localises through the locale argument", () => {
    expect(formatDateToRelative(new Date(Date.now() - 7_200_000), "fr")).toBe(
      "il y a 2 heures",
    );
  });
});
