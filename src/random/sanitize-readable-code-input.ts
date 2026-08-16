const READABLE_ALPHABET_SET = new Set("ABCDEFGHJKMNPQRSTUVWXYZ23456789");

/**
 * Sanitizes raw keyboard input into readable-code format as the user types.
 * Uppercases the string, strips characters outside the readable alphabet
 * (no I, L, O, 0, 1), caps at 8 significant chars, and inserts the `-`
 * separator after position 4.
 * @example sanitizeReadableCodeInput("k3f79txm") // "K3F7-9TXM"
 * @example sanitizeReadableCodeInput("K3F7-9T")  // "K3F7-9T"  (partial — still typing)
 */
export function sanitizeReadableCodeInput(raw: string): string {
  const chars = raw
    .toUpperCase()
    .split("")
    .filter((c) => READABLE_ALPHABET_SET.has(c))
    .slice(0, 8);
  if (chars.length <= 4) return chars.join("");
  return chars.slice(0, 4).join("") + "-" + chars.slice(4).join("");
}
