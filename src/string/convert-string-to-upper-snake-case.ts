import { splitWords } from "./_shared.js";

/** @example convertStringToUpperSnakeCase("my new flag") // "MY_NEW_FLAG" */
export function convertStringToUpperSnakeCase(value: string): string {
  const words = splitWords(value);
  if (!words.length) return value;
  return words
    .join("_")
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "");
}
