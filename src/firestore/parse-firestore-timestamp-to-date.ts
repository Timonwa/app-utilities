/**
 * Best-effort parse of any Firestore timestamp representation into a JS Date.
 * Accepts the shapes a timestamp actually arrives in: a Timestamp instance
 * (admin or client SDK — `{ seconds, nanoseconds }`), the `{ _seconds, _nanoseconds }`
 * JSON-serialized shape REST responses produce, a JS Date (pass-through), or a
 * number (unix milliseconds). Returns `null` for anything else — a parse never
 * guesses. No Firebase dependency: the shapes are duck-typed.
 *
 * @example parseFirestoreTimestampToDate({ _seconds: 1705276800, _nanoseconds: 0 }) // Date
 */
export function parseFirestoreTimestampToDate(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return value;
  if (typeof value === "number") return Number.isFinite(value) ? new Date(value) : null;

  if (typeof value === "object") {
    const timestamp = value as Record<string, unknown>;
    const seconds =
      typeof timestamp.seconds === "number"
        ? timestamp.seconds
        : typeof timestamp._seconds === "number"
          ? timestamp._seconds
          : null;
    if (seconds === null) return null;
    const nanoseconds =
      typeof timestamp.nanoseconds === "number"
        ? timestamp.nanoseconds
        : typeof timestamp._nanoseconds === "number"
          ? timestamp._nanoseconds
          : 0;
    return new Date(seconds * 1000 + Math.floor(nanoseconds / 1_000_000));
  }

  return null;
}
