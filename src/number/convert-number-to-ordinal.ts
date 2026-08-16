/**
 * Converts a number to its ordinal string representation.
 * @param num - Number to convert
 * @returns Ordinal string
 * @example convertNumberToOrdinal(22) // "22nd"
 */
export function convertNumberToOrdinal(num: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = num % 100;
  const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  return `${num}${suffix}`;
}
