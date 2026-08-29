import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * Whether a value is anything `parseFirestoreTimestampToDate` can turn into a
 * Date — a live Timestamp, a serialized shape, a Date, or unix milliseconds.
 *
 * @example isValidFirestoreTimestampInput({ seconds: 1705276800 }) // true
 */
export function isValidFirestoreTimestampInput(value: unknown): boolean {
  return parseFirestoreTimestampToDate(value) !== null;
}
