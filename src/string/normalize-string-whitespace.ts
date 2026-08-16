/**
 * Collapses every run of whitespace into a single space and trims the ends.
 *
 * @example normalizeStringWhitespace("hello    world ") // "hello world"
 */
export function normalizeStringWhitespace(value: string): string {
  if (!value) return value;
  return value.replace(/\s+/g, " ").trim();
}
