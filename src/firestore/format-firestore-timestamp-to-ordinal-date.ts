import { formatISOToOrdinalDate } from "../date/format-iso-to-ordinal-date.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * An ordinal date ("22nd Jun, 2023") from any timestamp shape, with a fallback
 * for anything unparseable.
 *
 * @example formatFirestoreTimestampToOrdinalDate({ _seconds: 1705276800 }) // "15th Jan, 2024"
 */
export function formatFirestoreTimestampToOrdinalDate(
  value: unknown,
  fallback = "—",
): string {
  const date = parseFirestoreTimestampToDate(value);
  return date ? formatISOToOrdinalDate(date.toISOString()) : fallback;
}
