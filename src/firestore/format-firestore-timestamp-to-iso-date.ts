import { formatDateToIsoDate } from "../date/format-date-to-iso-date.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * The LOCAL calendar date of any timestamp shape as YYYY-MM-DD — not the UTC
 * date, which is a different day for part of every timezone's evening or
 * morning. Returns the fallback for anything unparseable.
 *
 * @example formatFirestoreTimestampToIsoDate({ _seconds: 1705276800 }) // "2024-01-15"
 */
export function formatFirestoreTimestampToIsoDate(
  value: unknown,
  fallback = "—",
): string {
  const date = parseFirestoreTimestampToDate(value);
  return date ? formatDateToIsoDate(date) : fallback;
}
