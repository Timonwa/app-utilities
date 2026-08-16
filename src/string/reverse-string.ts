/**
 * Reverses a string by code point, so astral characters survive.
 *
 * `split("")` splits by UTF-16 code unit, which reverses an emoji into two broken
 * halves. The spread operator iterates code points instead.
 *
 * @example reverseString("hello") // "olleh"
 */
export function reverseString(value: string): string {
  if (!value) return value;
  return [...value].reverse().join("");
}
