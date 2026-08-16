/**
 * Splits a string into words on whitespace, hyphens, underscores, and camelCase
 * humps — but never between a letter and a digit, so "v2" and "api2" stay intact.
 */
export function splitWords(value: string): string[] {
  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // XMLHttp -> XML Http
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // helloWorld -> hello World
    .split(/[\s\-_.]+/) // "." too, so "user.first_name" title-cases correctly
    .filter(Boolean);
}
