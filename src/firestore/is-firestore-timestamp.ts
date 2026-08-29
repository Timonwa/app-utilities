/**
 * Whether a value walks and quacks like a Firestore Timestamp instance —
 * numeric `seconds` and `nanoseconds` plus the `toDate`/`toMillis` methods.
 * Duck-typed on purpose: an `instanceof Timestamp` check would make Firebase a
 * dependency, and admin-SDK and client-SDK Timestamps are different classes
 * anyway. Serialized `{ _seconds }` shapes do NOT pass — those are wire data,
 * not a live Timestamp; parse them with `parseFirestoreTimestampToDate`.
 *
 * @example isFirestoreTimestamp(Timestamp.now()) // true
 */
export function isFirestoreTimestamp(value: unknown): value is {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
  toMillis: () => number;
} {
  if (value == null || typeof value !== "object") return false;
  const timestamp = value as Record<string, unknown>;
  return (
    typeof timestamp.seconds === "number" &&
    typeof timestamp.nanoseconds === "number" &&
    typeof timestamp.toDate === "function" &&
    typeof timestamp.toMillis === "function"
  );
}
