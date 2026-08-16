import { formatNumberWithCommas } from "./format-number-with-commas.js";

/**
 * Formats a raw decimal-input string with thousands separators, preserving a
 * partial/trailing decimal so it stays usable mid-typing.
 * @param raw - Numeric string (digits + optional single ".")
 * @returns Grouped display string
 * @example formatDecimalInputWithCommas("1234567.8") // "1,234,567.8"
 */
export function formatDecimalInputWithCommas(raw: string | number): string {
  // Form field values can arrive as a number from the API — coerce before splitting.
  const str = String(raw ?? "");
  if (!str) return "";
  const [intPart = "", decPart] = str.split(".");
  const grouped = intPart ? formatNumberWithCommas(Number(intPart)) : "";
  return decPart !== undefined ? `${grouped}.${decPart}` : grouped;
}
