import { createSerializedFirestoreTimestampFromMillis } from "./create-serialized-firestore-timestamp-from-millis.js";

/**
 * The `{ seconds, nanoseconds }` wire shape for the current moment.
 *
 * @example createSerializedFirestoreTimestampNow() // { seconds: 1705276800, nanoseconds: 0 }
 */
export function createSerializedFirestoreTimestampNow(): {
  seconds: number;
  nanoseconds: number;
} {
  return createSerializedFirestoreTimestampFromMillis(Date.now());
}
