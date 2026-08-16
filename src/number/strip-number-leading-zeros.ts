/**
 * Strips leading zeros from a numeric string.
 * @param value - Numeric string
 * @returns String without leading zeros
 * @example stripNumberLeadingZeros("0045") // "45"
 */
export function stripNumberLeadingZeros(value: string): string {
  if (!value || typeof value !== "string") return "";
  if (!/^\d+$/.test(value)) return value;
  return value.replace(/^0+(?!$)/, "");
}
