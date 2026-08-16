/**
 * Copies text to the clipboard.
 *
 * @returns `true` on success; `false` if unsupported, denied, or not in a browser
 * @example
 * const copied = await copyTextToClipboard("K3F7-9TXM");
 * setLabel(copied ? "Copied" : "Press ⌘C");
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
