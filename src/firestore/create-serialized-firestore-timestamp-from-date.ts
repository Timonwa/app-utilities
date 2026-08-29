import { createSerializedFirestoreTimestampFromMillis } from "./create-serialized-firestore-timestamp-from-millis.js";

/**
 * The `{ seconds, nanoseconds }` wire shape for a Date — for fixtures and JSON
 * payloads without the SDK.
 *
 * @example createSerializedFirestoreTimestampFromDate(new Date(1705276800000)) // { seconds: 1705276800, nanoseconds: 0 }
 */
export function createSerializedFirestoreTimestampFromDate(date: Date): {
  seconds: number;
  nanoseconds: number;
} {
  return createSerializedFirestoreTimestampFromMillis(date.getTime());
}
