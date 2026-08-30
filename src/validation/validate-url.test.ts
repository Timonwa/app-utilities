import { describe, expect, it } from "vitest";
import { validateUrl } from "./index.js";

describe("form validators", () => {
  it("urls", () => {
    expect(validateUrl("https://example.com").valid).toBe(true);
    expect(validateUrl("not a url").valid).toBe(false);
  });

  it("requires an absolute URL", () => {
    expect(validateUrl("/relative/path").valid).toBe(false);
    expect(validateUrl("example.com").valid).toBe(false);
  });

  it("accepts other schemes — it checks parseability, not policy", () => {
    expect(validateUrl("ftp://files.example.com").valid).toBe(true);
  });
});
