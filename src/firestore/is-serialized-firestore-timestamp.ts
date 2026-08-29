/** The JSON wire shape a Firestore Timestamp serializes to — REST responses and
 * admin-SDK reads produce it with or without the underscore prefix. */
export type SerializedFirestoreTimestamp =
  | { seconds: number; nanoseconds?: number }
  | { _seconds: number; _nanoseconds?: number };

/**
 * Whether a value is the serialized `{ seconds }` / `{ _seconds }` wire shape of
 * a Firestore Timestamp — plain data, no methods. For a LIVE Timestamp instance
 * (with `toDate`/`toMillis`), use `isFirestoreTimestamp`.
 *
 * @example isSerializedFirestoreTimestamp({ _seconds: 1705276800, _nanoseconds: 0 }) // true
 */
export function isSerializedFirestoreTimestamp(
  value: unknown,
): value is SerializedFirestoreTimestamp {
  if (value == null || typeof value !== "object") return false;
  const timestamp = value as Record<string, unknown>;
  return typeof timestamp.seconds === "number" || typeof timestamp._seconds === "number";
}
