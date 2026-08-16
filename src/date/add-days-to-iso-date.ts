/**
 * Adds days to an ISO date string and returns a new ISO string.
 * @param isoString - Base ISO date string
 * @param days - Days to add (negative subtracts)
 * @returns New ISO string
 * @example addDaysToISODate("2024-01-15T00:00:00.000Z", 5) // "2024-01-20T00:00:00.000Z"
 */
export function addDaysToISODate(isoString: string, days: number): string {
  const date = new Date(isoString);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}
