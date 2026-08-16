/**
 * Gets the start of day (00:00:00.000) for a milliseconds timestamp.
 * @param millis - Source milliseconds
 * @returns Milliseconds at start of that day
 * @example getStartOfDayMillis(1705300000000) // Start-of-day millis
 */
export function getStartOfDayMillis(millis: number): number {
  const date = new Date(millis);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}
