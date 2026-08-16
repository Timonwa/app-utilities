/**
 * Compares two ISO date strings. Returns -1, 0, or 1 for less-than, equal, greater-than.
 * @param isoA - First ISO date string
 * @param isoB - Second ISO date string
 * @returns -1, 0, or 1
 * @example compareISODates("2024-01-15", "2024-01-16") // -1
 */
export function compareISODates(isoA: string, isoB: string): number {
  const dateA = new Date(isoA).getTime();
  const dateB = new Date(isoB).getTime();
  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}
