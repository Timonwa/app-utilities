import { describe, expect, it } from "vitest";
import { extractUuidFromPath } from "./index.js";

describe("extractUuidFromPath", () => {
  it("finds a UUID wherever it sits in the path", () => {
    const uuid = "3f2504e0-4f89-11d3-9a0c-0305e82c3301";
    expect(extractUuidFromPath(`/f/${uuid}/raw/a.jpg`)).toBe(uuid);
    expect(extractUuidFromPath(`uploads/${uuid}.png`)).toBe(uuid);
  });

  it("returns undefined when there is none", () => {
    expect(extractUuidFromPath("/f/not-a-uuid/raw/")).toBeUndefined();
    expect(extractUuidFromPath(null)).toBeUndefined();
  });

  it("matches uppercase UUIDs without rewriting their case", () => {
    expect(extractUuidFromPath("/f/3F2504E0-4F89-11D3-9A0C-0305E82C3301/raw/")).toBe(
      "3F2504E0-4F89-11D3-9A0C-0305E82C3301",
    );
  });

  it("returns the first UUID when the path has several", () => {
    const first = "3f2504e0-4f89-11d3-9a0c-0305e82c3301";
    const second = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    expect(extractUuidFromPath(`/${first}/${second}`)).toBe(first);
  });
});
