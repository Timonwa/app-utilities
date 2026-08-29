import type { SerializedFirestoreTimestamp } from "./is-serialized-firestore-timestamp.js";
import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/** A live Timestamp instance or its serialized wire shape — every input the
 * exact converters accept. */
export type FirestoreTimestampInput =
  | SerializedFirestoreTimestamp
  | { seconds: number; nanoseconds: number; toDate: () => Date; toMillis: () => number };

/**
 * Exact conversion of a Timestamp (live or serialized) to a JS Date — the typed
 * counterpart of `parseFirestoreTimestampToDate`, for values already known to be
 * timestamps. For `unknown` input, parse instead.
 *
 * @example convertFirestoreTimestampToDate({ seconds: 1705276800, nanoseconds: 0 }) // Date
 */
export function convertFirestoreTimestampToDate(
  timestamp: FirestoreTimestampInput,
): Date {
  // Non-null by construction: every FirestoreTimestampInput shape parses.
  return parseFirestoreTimestampToDate(timestamp) as Date;
}
