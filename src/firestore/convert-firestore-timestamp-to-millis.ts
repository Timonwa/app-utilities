import {
  convertFirestoreTimestampToDate,
  type FirestoreTimestampInput,
} from "./convert-firestore-timestamp-to-date.js";

/**
 * Exact conversion of a Timestamp (live or serialized) to unix milliseconds.
 *
 * @example convertFirestoreTimestampToMillis({ seconds: 1705276800, nanoseconds: 0 }) // 1705276800000
 */
export function convertFirestoreTimestampToMillis(
  timestamp: FirestoreTimestampInput,
): number {
  return convertFirestoreTimestampToDate(timestamp).getTime();
}
