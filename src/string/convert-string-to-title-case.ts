import { splitWords } from "./_shared.js";
import { capitalizeString } from "./capitalize-string.js";

/**
 * Title-cases every word, splitting on camelCase humps as well as spaces.
 *
 * @example convertStringToTitleCase("hello world") // "Hello World"
 * @example convertStringToTitleCase("helloWorld") // "Hello World"
 */
export function convertStringToTitleCase(value: string): string {
  const words = splitWords(value);
  if (!words.length) return value;
  return words.map((word) => capitalizeString(word.toLowerCase())).join(" ");
}
