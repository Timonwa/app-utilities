import { formatDateToShortDate } from "../date/format-date-to-short-date.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * A localized numeric date ("1/15/24" in en-US) from any timestamp shape, with
 * a fallback for anything unparseable.
 *
 * @example formatFirestoreTimestampToShortDate({ _seconds: 1705276800 }, { locale: "en-US" }) // "1/15/24"
 */
export function formatFirestoreTimestampToShortDate(
  value: unknown,
  options?: { locale?: string; fallback?: string },
): string {
  const date = parseFirestoreTimestampToDate(value);
  return date ? formatDateToShortDate(date, options?.locale) : (options?.fallback ?? "—");
}
