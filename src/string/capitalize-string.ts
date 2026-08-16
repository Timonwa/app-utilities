/**
 * Upper-cases the first character and leaves the rest alone.
 *
 * Deliberately not es-toolkit's `capitalize`, which lower-cases the remainder and
 * would turn "McDonald" into "Mcdonald".
 *
 * @example capitalizeString("hello") // "Hello"
 * @example capitalizeString("McDonald") // "McDonald"
 */
export function capitalizeString(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
