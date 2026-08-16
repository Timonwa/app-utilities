import { splitWords } from "./_shared.js";

/**
 * Converts a string to snake_case, keeping digits attached to their word ("v2 Rollout" becomes "v2_rollout").
 *
 * @example convertStringToSnakeCase("HelloWorld") // "hello_world"
 */
export function convertStringToSnakeCase(value: string): string {
  const words = splitWords(value);
  return words.length ? words.join("_").toLowerCase() : value;
}
