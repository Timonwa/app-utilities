import { describe, expect, it } from "vitest";
import { formatBytes, parseSizeToBytes } from "./index.js";

describe("parseSizeToBytes", () => {
  it("parses a written size, case- and space-insensitively", () => {
    expect(parseSizeToBytes("1.5 MB")).toBe(1_572_864);
    expect(parseSizeToBytes("500kb")).toBe(512_000);
    expect(parseSizeToBytes("  2 GB ")).toBe(2_147_483_648);
  });

  // null rather than 0, so "empty file" and "not a size" stay distinguishable.
  it("returns null for anything that is not a size", () => {
    expect(parseSizeToBytes("about 2 gigs")).toBeNull();
    expect(parseSizeToBytes("")).toBeNull();
    expect(parseSizeToBytes("MB")).toBeNull();
  });

  it("round-trips with formatBytes", () => {
    expect(formatBytes(parseSizeToBytes("1.50 MB") as number)).toBe("1.50 MB");
  });
});
