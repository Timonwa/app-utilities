/**
 * Turns a CONSTANT_NAME into a sentence-cased label.
 *
 * Distinct from title case: only the first word is capitalized, which is what reads
 * correctly for a label sitting in a sentence or a form field.
 *
 * @example humanizeConstant("arts_and_culture") // "Arts and culture"
 */
export function humanizeConstant(value: string): string {
  if (!value) return value;
  const words = value.toLowerCase().replace(/_/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}
