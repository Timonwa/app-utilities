import { describe, expect, it } from "vitest";
import { installBareNavigator, installClipboardMock } from "./_test-helpers.js";
import { readTextFromClipboard } from "./index.js";

describe("readTextFromClipboard", () => {
  it("resolves the clipboard text on success", async () => {
    installClipboardMock({ readText: () => Promise.resolve("hello") });
    await expect(readTextFromClipboard()).resolves.toBe("hello");
  });

  it("resolves null when permission is denied", async () => {
    installClipboardMock({
      readText: () => Promise.reject(new Error("denied")),
    });
    await expect(readTextFromClipboard()).resolves.toBeNull();
  });

  it("resolves null when the clipboard API is missing", async () => {
    installBareNavigator({});
    await expect(readTextFromClipboard()).resolves.toBeNull();
  });

  it("resolves null outside a browser", async () => {
    installBareNavigator(undefined);
    await expect(readTextFromClipboard()).resolves.toBeNull();
  });
});
