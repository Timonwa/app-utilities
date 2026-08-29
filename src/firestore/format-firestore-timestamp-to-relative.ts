import { formatDateToRelative } from "../date/format-date-to-relative.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * Relative time ("2 hours ago", "in 3 days") from any timestamp shape, with a
 * fallback for anything unparseable.
 *
 * @example formatFirestoreTimestampToRelative(doc.createdAt) // "2 hours ago"
 */
export function formatFirestoreTimestampToRelative(
  value: unknown,
  options?: { locale?: string; fallback?: string },
): string {
  const date = parseFirestoreTimestampToDate(value);
  return date ? formatDateToRelative(date, options?.locale) : (options?.fallback ?? "—");
}
