import { describe, expect, it } from "vitest";
import { file } from "./_test-helpers.js";
import { validateDocumentFile } from "./index.js";

describe("validateDocumentFile", () => {
  it("accepts PDF and Word types by default", () => {
    expect(validateDocumentFile(file("application/pdf"))).toEqual({ valid: true });
    expect(validateDocumentFile(file("application/msword"))).toEqual({ valid: true });
    expect(
      validateDocumentFile(
        file("application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      ),
    ).toEqual({ valid: true });
  });

  it("rejects other types by default", () => {
    expect(validateDocumentFile(file("image/png")).valid).toBe(false);
    expect(validateDocumentFile(file("text/plain")).valid).toBe(false);
  });

  it("honours a custom allowed list over the default", () => {
    expect(validateDocumentFile(file("text/plain"), ["text/plain"])).toEqual({
      valid: true,
    });
    expect(validateDocumentFile(file("application/pdf"), ["text/plain"]).valid).toBe(
      false,
    );
  });
});
