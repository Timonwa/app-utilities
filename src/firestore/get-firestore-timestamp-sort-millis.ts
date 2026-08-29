import { parseFirestoreTimestampToDate } from "./parse-firestore-timestamp-to-date.js";

/**
 * Unix milliseconds from any Firestore timestamp representation, with `0` for
 * anything unparseable — a deliberate "very old" sentinel so sort and compare
 * pipelines never branch on null. When the real parse-or-null contract matters,
 * use `parseFirestoreTimestampToDate` instead.
 *
 * @example getFirestoreTimestampSortMillis({ _seconds: 1705276800 }) // 1705276800000
 */
export function getFirestoreTimestampSortMillis(value: unknown): number {
  if (value && typeof value === "object" && "toMillis" in value) {
    const timestamp = value as { toMillis: () => number };
    return timestamp.toMillis();
  }
  return parseFirestoreTimestampToDate(value)?.getTime() ?? 0;
}
