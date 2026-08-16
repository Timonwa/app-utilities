/**
 * Returns the milliseconds timestamp of the first instant of the month containing the given timestamp, in local time.
 * @example getStartOfMonthMillis(new Date(2024, 0, 15).getTime()) // millis of Jan 1 00:00:00.000
 */
export function getStartOfMonthMillis(millis: number): number {
  const date = new Date(millis);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}
