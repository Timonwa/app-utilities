/** @example normalizeStringWhitespace("hello    world ") // "hello world" */
export function normalizeStringWhitespace(value: string): string {
  if (!value) return value;
  return value.replace(/\s+/g, " ").trim();
}
