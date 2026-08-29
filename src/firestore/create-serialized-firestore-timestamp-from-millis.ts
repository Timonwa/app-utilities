/**
 * The `{ seconds, nanoseconds }` wire shape for a unix-milliseconds moment — for
 * fixtures and JSON payloads without the SDK. A real `Timestamp` instance can
 * only come from an SDK (client and admin have different classes), and Firestore
 * writes accept a plain `Date` anyway.
 *
 * @example createSerializedFirestoreTimestampFromMillis(1705276800500) // { seconds: 1705276800, nanoseconds: 500000000 }
 */
export function createSerializedFirestoreTimestampFromMillis(millis: number): {
  seconds: number;
  nanoseconds: number;
} {
  const seconds = Math.floor(millis / 1000);
  return { seconds, nanoseconds: Math.round((millis - seconds * 1000) * 1_000_000) };
}
