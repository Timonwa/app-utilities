/**
 * Comparator for sorting Dates — `dates.sort(compareDates)` ascends. Returns -1, 0, or
 * 1, matching `compareISODates`.
 *
 * @example [b, a].sort(compareDates) // [a, b] when a is earlier
 */
export function compareDates(dateA: Date, dateB: Date): number {
  const diff = dateA.getTime() - dateB.getTime();
  if (diff < 0) return -1;
  if (diff > 0) return 1;
  return 0;
}
