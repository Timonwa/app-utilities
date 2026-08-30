import { describe, expect, it } from "vitest";
import { installBareNavigator, installClipboardMock } from "./_test-helpers.js";
import { copyTextToClipboard } from "./index.js";

describe("copyTextToClipboard", () => {
  it("writes the text and resolves true on success", async () => {
    const { writeText } = installClipboardMock();
    await expect(copyTextToClipboard("K3F7-9TXM")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("K3F7-9TXM");
  });

  it("copies an empty string too", async () => {
    const { writeText } = installClipboardMock();
    await expect(copyTextToClipboard("")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("");
  });

  it("resolves false when the write is denied", async () => {
    installClipboardMock({
      writeText: () => Promise.reject(new Error("denied")),
    });
    await expect(copyTextToClipboard("secret")).resolves.toBe(false);
  });

  it("resolves false when the clipboard API is missing", async () => {
    installBareNavigator({});
    await expect(copyTextToClipboard("text")).resolves.toBe(false);
  });

  it("resolves false outside a browser", async () => {
    installBareNavigator(undefined);
    await expect(copyTextToClipboard("text")).resolves.toBe(false);
  });
});
