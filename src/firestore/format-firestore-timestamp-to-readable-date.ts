import { formatDateToReadableDate } from "../date/format-date-to-readable-date.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * A localized long date ("January 15, 2024") from any timestamp shape, with a
 * fallback for anything unparseable — the display formatter wire data needs.
 *
 * @example formatFirestoreTimestampToReadableDate({ _seconds: 1705276800 }) // "January 15, 2024"
 */
export function formatFirestoreTimestampToReadableDate(
  value: unknown,
  options?: { locale?: string; fallback?: string },
): string {
  const date = parseFirestoreTimestampToDate(value);
  return date
    ? formatDateToReadableDate(date, options?.locale)
    : (options?.fallback ?? "—");
}
