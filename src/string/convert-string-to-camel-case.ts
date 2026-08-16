import { splitWords } from "./_shared.js";
import { capitalizeString } from "./capitalize-string.js";

/**
 * Converts a string to camelCase, keeping digits attached to their word ("v2 rollout" becomes "v2Rollout").
 *
 * @example convertStringToCamelCase("hello world") // "helloWorld"
 */
export function convertStringToCamelCase(value: string): string {
  const words = splitWords(value);
  if (!words.length) return value;
  return words
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : capitalizeString(word.toLowerCase()),
    )
    .join("");
}
