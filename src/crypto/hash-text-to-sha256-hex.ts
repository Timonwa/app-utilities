/**
 * SHA-256 of a UTF-8 string as lowercase hex. Web Crypto, so it runs anywhere —
 * Node, browser, edge/workers — which is why it is async: `subtle.digest`
 * returns a Promise.
 *
 * @example await hashTextToSha256Hex("hello") // "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
 */
export async function hashTextToSha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
