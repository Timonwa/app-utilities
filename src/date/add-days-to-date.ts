/**
 * Adds days to a date.
 * @param date - Base date
 * @param days - Days to add (negative subtracts)
 * @returns New date with days added
 * @example addDaysToDate(new Date("2024-01-01"), 5) // Date for 2024-01-06
 */
export function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
