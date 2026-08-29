import {
  convertFirestoreTimestampToDate,
  type FirestoreTimestampInput,
} from "./convert-firestore-timestamp-to-date.js";

/**
 * Exact conversion of a Timestamp (live or serialized) to a full ISO 8601 string.
 *
 * @example convertFirestoreTimestampToISOString({ seconds: 1705276800, nanoseconds: 0 }) // "2024-01-15T00:00:00.000Z"
 */
export function convertFirestoreTimestampToISOString(
  timestamp: FirestoreTimestampInput,
): string {
  return convertFirestoreTimestampToDate(timestamp).toISOString();
}
