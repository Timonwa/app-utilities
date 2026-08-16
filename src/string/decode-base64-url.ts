/**
 * Decodes a base64url string — base64 with `-`/`_` instead of `+`/`/`, and padding
 * dropped. That is the encoding used by JWT segments and by URL-safe tokens.
 *
 * Returns `null` on anything undecodable, so a caller can tell failure from an empty
 * payload. The original returned the string `"{}"`, which quietly looks like a valid
 * empty JSON object to whatever parses it next.
 *
 * @example decodeBase64Url("eyJhIjoxfQ") // '{"a":1}'
 */
export function decodeBase64Url(value: string): string | null {
  try {
    const base64 = String(value).replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}
