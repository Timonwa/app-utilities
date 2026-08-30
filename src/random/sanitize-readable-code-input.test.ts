import { describe, expect, it } from "vitest";
import { READABLE_CODE_REGEX, sanitizeReadableCodeInput } from "./index.js";

describe("sanitizeReadableCodeInput", () => {
  it("uppercases and inserts the dash after four characters", () => {
    expect(sanitizeReadableCodeInput("k3f79txm")).toBe("K3F7-9TXM");
  });

  it("leaves a partial entry unpadded while the user is typing", () => {
    expect(sanitizeReadableCodeInput("K3F7-9T")).toBe("K3F7-9T");
    expect(sanitizeReadableCodeInput("k3f")).toBe("K3F");
    expect(sanitizeReadableCodeInput("k3f7")).toBe("K3F7");
  });

  it("strips characters outside the readable alphabet", () => {
    expect(sanitizeReadableCodeInput("k3!f7 9t-xm")).toBe("K3F7-9TXM");
    expect(sanitizeReadableCodeInput("I1L0O")).toBe("");
  });

  it("caps at eight significant characters", () => {
    expect(sanitizeReadableCodeInput("K3F79TXMEXTRA")).toBe("K3F7-9TXM");
  });

  it("returns an empty string for empty input", () => {
    expect(sanitizeReadableCodeInput("")).toBe("");
  });

  it("produces output the code regex accepts once complete", () => {
    expect(sanitizeReadableCodeInput("k3f79txm")).toMatch(READABLE_CODE_REGEX);
  });
});
