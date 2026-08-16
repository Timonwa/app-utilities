/**
 * Reduces a string to lowercase letters and digits, for use as a comparison key.
 *
 * Lossy on purpose — "O'Brien", "obrien" and "O Brien" all collapse to the same key, so
 * they compare equal. Never store the result as the value.
 *
 * @example stripToAlphanumeric("O'Brien-Smith") // "obriensmith"
 */
export function stripToAlphanumeric(value: string): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
