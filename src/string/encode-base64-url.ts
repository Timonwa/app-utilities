/**
 * Encodes a string as base64url — base64 with `-`/`_` instead of `+`/`/` and no
 * padding, the encoding JWT segments and URL-safe tokens use. The inverse of
 * `decodeBase64Url`.
 *
 * @example encodeBase64Url('{"a":1}') // "eyJhIjoxfQ"
 */
export function encodeBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(String(value ?? ""));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
