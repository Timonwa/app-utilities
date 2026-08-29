import { getFirestoreTimestampSortMillis } from "./get-firestore-timestamp-sort-millis.js";

/**
 * Comparator for sorting any timestamp shapes — `docs.sort((a, b) =>
 * compareFirestoreTimestamps(a.createdAt, b.createdAt))` ascends. Unparseable
 * values sort as the "very old" 0 sentinel, matching `getFirestoreTimestampSortMillis`.
 *
 * @example [later, earlier].sort(compareFirestoreTimestamps) // [earlier, later]
 */
export function compareFirestoreTimestamps(a: unknown, b: unknown): number {
  const diff = getFirestoreTimestampSortMillis(a) - getFirestoreTimestampSortMillis(b);
  if (diff < 0) return -1;
  if (diff > 0) return 1;
  return 0;
}
