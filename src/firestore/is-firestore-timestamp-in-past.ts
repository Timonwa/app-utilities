import { isDateInPast } from "../date/is-date-in-past.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * Whether any timestamp shape is strictly in the past. Unparseable values are
 * `false` — a boolean check never guesses.
 *
 * @example isFirestoreTimestampInPast(event.endsAt) // true
 */
export function isFirestoreTimestampInPast(value: unknown): boolean {
  const date = parseFirestoreTimestampToDate(value);
  return date ? isDateInPast(date) : false;
}
