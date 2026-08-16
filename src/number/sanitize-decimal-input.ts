/**
 * Strips a numeric-input string down to digits and a single decimal point.
 * @param input - Raw user input
 * @returns Sanitized numeric string
 * @example sanitizeDecimalInput("$1,2.3.4") // "12.34"
 */
export function sanitizeDecimalInput(input: string): string {
  const cleaned = input.replace(/[^\d.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) return cleaned;
  return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
}
