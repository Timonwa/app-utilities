/** @example getEndOfMonthMillis(new Date(2024, 0, 15).getTime()) // millis of Jan 31 23:59:59.999 */
export function getEndOfMonthMillis(millis: number): number {
  const date = new Date(millis);
  date.setMonth(date.getMonth() + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
}
