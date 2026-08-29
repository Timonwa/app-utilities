import { isDateToday } from "../date/is-date-today.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * Whether any timestamp shape falls on today's LOCAL calendar day. Unparseable
 * values are `false` — a boolean check never guesses.
 *
 * @example isFirestoreTimestampToday(doc.createdAt) // true
 */
export function isFirestoreTimestampToday(value: unknown): boolean {
  const date = parseFirestoreTimestampToDate(value);
  return date ? isDateToday(date) : false;
}
