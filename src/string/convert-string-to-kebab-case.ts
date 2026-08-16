import { splitWords } from "./_shared.js";

/** @example convertStringToKebabCase("HelloWorld") // "hello-world" */
export function convertStringToKebabCase(value: string): string {
  const words = splitWords(value);
  return words.length ? words.join("-").toLowerCase() : value;
}
