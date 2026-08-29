import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * Converts any Firestore timestamp representation (or Date, or unix millis) to
 * the `YYYY-MM-DDTHH:mm` value an `<input type="datetime-local">` expects.
 * Output is in the BROWSER's local timezone — that is how `datetime-local`
 * interprets its `value` prop. Returns `""` for anything unparseable.
 *
 * @example convertFirestoreTimestampToDateTimeLocal({ _seconds: 1789459200 }) // "2026-09-23T10:00"
 */
export function convertFirestoreTimestampToDateTimeLocal(value: unknown): string {
  const date = parseFirestoreTimestampToDate(value);
  if (!date) return "";
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}
