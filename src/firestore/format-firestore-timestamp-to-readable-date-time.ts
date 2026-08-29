import { formatDateToReadableDateTime } from "../date/format-date-to-readable-date-time.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * A localized long date with the time ("January 15, 2024 at 3:30 PM") from any
 * timestamp shape, with a fallback for anything unparseable.
 *
 * @example formatFirestoreTimestampToReadableDateTime({ _seconds: 1705276800 }) // "January 15, 2024 at 12:00 AM"
 */
export function formatFirestoreTimestampToReadableDateTime(
  value: unknown,
  options?: { locale?: string; fallback?: string },
): string {
  const date = parseFirestoreTimestampToDate(value);
  return date
    ? formatDateToReadableDateTime(date, options?.locale)
    : (options?.fallback ?? "—");
}
