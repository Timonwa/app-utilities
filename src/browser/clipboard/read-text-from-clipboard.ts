/**
 * Reads text from the clipboard. Prompts for permission in most browsers, so call
 * it from a user gesture or expect `null`.
 *
 * @returns the text, or `null` if unsupported, denied, or not in a browser
 */
export async function readTextFromClipboard(): Promise<string | null> {
  if (typeof navigator === "undefined" || !navigator.clipboard) return null;

  try {
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
}
