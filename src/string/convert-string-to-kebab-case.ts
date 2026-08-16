import { splitWords } from "./_shared.js";

/**
 * Converts a string to kebab-case, keeping digits attached to their word ("v2 Rollout" becomes "v2-rollout").
 *
 * @example convertStringToKebabCase("HelloWorld") // "hello-world"
 */
export function convertStringToKebabCase(value: string): string {
  const words = splitWords(value);
  return words.length ? words.join("-").toLowerCase() : value;
}
