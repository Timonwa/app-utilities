import { isDateInFuture } from "../date/is-date-in-future.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * Whether any timestamp shape is strictly in the future. Unparseable values
 * are `false` — a boolean check never guesses.
 *
 * @example isFirestoreTimestampInFuture(event.startsAt) // true
 */
export function isFirestoreTimestampInFuture(value: unknown): boolean {
  const date = parseFirestoreTimestampToDate(value);
  return date ? isDateInFuture(date) : false;
}
