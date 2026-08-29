import { getTimeFromDate } from "../time/get-time-from-date.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * The HH:MM:SS portion of any timestamp shape, in local time, with a fallback
 * for anything unparseable.
 *
 * @example getTimeFromFirestoreTimestamp(event.startsAt) // "15:30:45"
 */
export function getTimeFromFirestoreTimestamp(value: unknown, fallback = "—"): string {
  const date = parseFirestoreTimestampToDate(value);
  return date ? getTimeFromDate(date) : fallback;
}
