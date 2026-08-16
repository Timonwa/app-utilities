/**
 * Gets the end of day (23:59:59.999) for a milliseconds timestamp.
 * @param millis - Source milliseconds
 * @returns Milliseconds at end of that day
 * @example getEndOfDayMillis(1705300000000) // End-of-day millis
 */
export function getEndOfDayMillis(millis: number): number {
  const date = new Date(millis);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
}
