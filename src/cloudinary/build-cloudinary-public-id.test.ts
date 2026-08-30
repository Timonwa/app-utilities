import { describe, expect, it } from "vitest";
import { buildCloudinaryPublicId } from "./index.js";

describe("buildCloudinaryPublicId", () => {
  it("joins segments and drops empties", () => {
    expect(buildCloudinaryPublicId(["events", "ev_1", "ph_2"])).toBe("events/ev_1/ph_2");
    expect(buildCloudinaryPublicId(["events", "", "ph_2"])).toBe("events/ph_2");
  });

  it("replaces characters that would break the URL", () => {
    expect(buildCloudinaryPublicId(["users", "a b?c"])).toBe("users/a-b-c");
    expect(buildCloudinaryPublicId(["a#b", "c&d"])).toBe("a-b/c-d");
  });

  it("accepts numbers", () => {
    expect(buildCloudinaryPublicId(["events", 42])).toBe("events/42");
  });
});
