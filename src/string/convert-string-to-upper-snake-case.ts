import { splitWords } from "./_shared.js";

/**
 * Converts a string to UPPER_SNAKE_CASE, keeping digits attached to their word and stripping any character that is not A-Z, 0-9, or underscore.
 *
 * @example convertStringToUpperSnakeCase("my new flag") // "MY_NEW_FLAG"
 */
export function convertStringToUpperSnakeCase(value: string): string {
  const words = splitWords(value);
  if (!words.length) return value;
  return words
    .join("_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "");
}
