import { splitWords } from "./_shared.js";

/** @example convertStringToSnakeCase("HelloWorld") // "hello_world" */
export function convertStringToSnakeCase(value: string): string {
  const words = splitWords(value);
  return words.length ? words.join("_").toLowerCase() : value;
}
