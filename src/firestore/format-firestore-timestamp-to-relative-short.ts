import { formatDateToRelativeShort } from "../date/format-date-to-relative-short.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * Compact relative time for tight UI ("5m ago", "in 3d") from any timestamp
 * shape, with a fallback for anything unparseable.
 *
 * @example formatFirestoreTimestampToRelativeShort(doc.createdAt) // "5m ago"
 */
export function formatFirestoreTimestampToRelativeShort(
  value: unknown,
  fallback = "—",
): string {
  const date = parseFirestoreTimestampToDate(value);
  return date ? formatDateToRelativeShort(date) : fallback;
}
